import dbConnect from "@/utils/db";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

type Landmark = {
    x: number;
    y: number;
    z?: number;
};

type FaceScores = {
    puffinessScore: number;
    puffinessLevel: "low" | "medium" | "high";
    eyeBagScore: number;
    eyeBagLevel: "low" | "medium" | "high";
};

type BloatingResult = {
    widthHeightRatio: number;
    cheekRatio: number;
    jawAngle: number;
    bloatingScore: number;
    bloatingLevel: "low" | "medium" | "high";
};


export async function POST(req: Request) {
    try {
        await dbConnect();
        const formData = await req.formData()


        //console.log("------>", formData);

        const image = formData.get("image") as File;
        const days = formData.get("days");
        const results = formData.get("results") as string;

        //console.log("------>", image, days, results);
        if (!image) {
            return NextResponse.json({
                error: "No image provided",
                status: 400,
                message: "Failed"
            })
        }

        ////////// FACIAL LOGIC WILL BE HERE //////////
        const newResult = JSON.parse(results);
        const landmarks = newResult.faceLandmarks[0];
        //console.log("landmarks", landmarks);

        const { puffinessScore, puffinessLevel } =
            calculatePuffiness(landmarks);

        const { eyeBagScore, eyeBagLevel } =
            calculateEyeBags(landmarks);

        console.log("puffinessScore", puffinessScore);
        console.log("puffinessLevel", puffinessLevel);
        console.log("eyeBagScore", eyeBagScore);
        console.log("eyeBagLevel", eyeBagLevel);

        //for water retention and bloating
        // --- Face width & height ---
        const LEFT_FACE = landmarks[234];
        const RIGHT_FACE = landmarks[454];
        const TOP_FACE = landmarks[10];
        const CHIN = landmarks[152];

        const faceWidth = dist(LEFT_FACE, RIGHT_FACE);
        const faceHeight = dist(TOP_FACE, CHIN);

        const widthHeightRatio = faceWidth / faceHeight;

        // --- Cheek fullness ---
        const LEFT_CHEEK = landmarks[93];
        const RIGHT_CHEEK = landmarks[323];

        const cheekWidth = dist(LEFT_CHEEK, RIGHT_CHEEK);
        const cheekRatio = cheekWidth / faceWidth;

        // --- Jawline sharpness ---
        const JAW_LEFT = landmarks[172];
        const CHIN_POINT = landmarks[152];
        const JAW_RIGHT = landmarks[397];

        const jawAngle = angle(JAW_LEFT, CHIN_POINT, JAW_RIGHT);

        // --- Bloating score ---
        let score = 0;

        if (widthHeightRatio > 0.85) score += 1;
        if (cheekRatio > 0.60) score += 1;
        if (jawAngle > 125) score += 1;

        // --- Level ---
        let bloatingLevel: "low" | "medium" | "high";

        if (score >= 2) bloatingLevel = "high";
        else if (score === 1) bloatingLevel = "medium";
        else bloatingLevel = "low";

        console.log("bloatingLevel", bloatingLevel);
        console.log("bloatingScore", score);
        console.log("cheekRatio", cheekRatio);
        console.log("jawAngle", jawAngle);
        console.log("widthHeightRatio", widthHeightRatio);

        ////////CLOUDINARY UPLOAD /////////

        //Converting file into buffer
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        //Uploading to cloudinary

        const uploadResponse = await new Promise<UploadApiResponse>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({
                folder: "quit-sugar", //optional organization of images
            },
                (error, result) => {
                    if (error) reject(error);
                    else if (!result) reject(new Error("No result from Cloudinary"));
                    else resolve(result);
                }
            );
            uploadStream.end(buffer)
        })

        console.log("Cloudinary response ", uploadResponse.secure_url);


        return NextResponse.json({ success: true, message: "Success" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


function calculateEyeBags(landmarks: Landmark[]) {
    // Left eye
    const LEFT_EYE_TOP = landmarks[159];
    const LEFT_EYE_BOTTOM = landmarks[145];

    // Right eye
    const RIGHT_EYE_TOP = landmarks[386];
    const RIGHT_EYE_BOTTOM = landmarks[374];

    // Eye width (reference)
    const LEFT_EYE_LEFT = landmarks[33];
    const LEFT_EYE_RIGHT = landmarks[133];

    const leftEyeHeight = dist(LEFT_EYE_TOP, LEFT_EYE_BOTTOM);
    const rightEyeHeight = dist(RIGHT_EYE_TOP, RIGHT_EYE_BOTTOM);

    const eyeWidth = dist(LEFT_EYE_LEFT, LEFT_EYE_RIGHT);

    const eyeBagScore =
        ((leftEyeHeight + rightEyeHeight) / 2) / eyeWidth;

    let eyeBagLevel: "low" | "medium" | "high";

    if (eyeBagScore > 0.30) eyeBagLevel = "high";
    else if (eyeBagScore > 0.22) eyeBagLevel = "medium";
    else eyeBagLevel = "low";

    return { eyeBagScore, eyeBagLevel };
}


//for puffiness
function calculatePuffiness(landmarks: Landmark[]) {
    const LEFT_FACE = landmarks[234];
    const RIGHT_FACE = landmarks[454];

    const LEFT_CHEEK = landmarks[93];
    const RIGHT_CHEEK = landmarks[323];

    const faceWidth = dist(LEFT_FACE, RIGHT_FACE);
    const cheekWidth = dist(LEFT_CHEEK, RIGHT_CHEEK);

    const puffinessScore = cheekWidth / faceWidth;

    let puffinessLevel: "low" | "medium" | "high";

    if (puffinessScore > 0.64) puffinessLevel = "high";
    else if (puffinessScore > 0.58) puffinessLevel = "medium";
    else puffinessLevel = "low";

    return { puffinessScore, puffinessLevel };
}

// Helper function for distance
function dist(a: Landmark, b: Landmark): number {
    return Math.sqrt(
        (a.x - b.x) ** 2 +
        (a.y - b.y) ** 2
    );
}

//for bloating

function angle(a: Landmark, b: Landmark, c: Landmark): number {
    const ab = [a.x - b.x, a.y - b.y];
    const cb = [c.x - b.x, c.y - b.y];

    const dot = ab[0] * cb[0] + ab[1] * cb[1];
    const magA = Math.sqrt(ab[0] ** 2 + ab[1] ** 2);
    const magB = Math.sqrt(cb[0] ** 2 + cb[1] ** 2);

    return Math.acos(dot / (magA * magB)) * (180 / Math.PI);
}
//    //first for puffinessc
//     const newResult = JSON.parse(results);
//     // console.log("landmarks", newResult.faceLandmarks[0]);

//     const calculateDistance = (point1: any, point2: any) => {
//         return Math.sqrt(
//             Math.pow(point2.x - point1.x, 2) +
//             Math.pow(point2.y - point1.y, 2) +
//             Math.pow(point2.z - point1.z, 2)
//         );
//     };

//     const faceWidth = calculateDistance(newResult.faceLandmarks[0][234], newResult.faceLandmarks[0][454]);
//     const faceHeight = calculateDistance(newResult.faceLandmarks[0][10], newResult.faceLandmarks[0][152]);
//     const puffinessRatio = faceWidth / faceHeight;

//     console.log("puffinessRatio", puffinessRatio);


//     //for Eyebag

//     // Define the structure of a MediaPipe landmark.
//     // (If you are importing NormalizedLandmark from @mediapipe/tasks-vision, you can skip this interface).
//     interface Landmark {
//         x: number;
//         y: number;
//         z: number;
//         visibility?: number;
//     }

//     // Explicitly type the landmarks array
//     const landmarks: Landmark[] = newResult.faceLandmarks[0];

//     // 1. Helper function to get the average Z-depth, with strict parameter and return typing
//     const calculateAverageZ = (indices: number[]): number => {
//         let sumZ = 0;
//         indices.forEach((index: number) => {
//             sumZ += landmarks[index].z;
//         });
//         return sumZ / indices.length;
//     };

//     // 2. Define the exact indices as number arrays
//     const leftPuffIndices: number[] = [100, 101, 116, 117, 118, 119];
//     const leftTroughIndices: number[] = [114, 120, 121, 122];

//     const rightPuffIndices: number[] = [329, 330, 345, 346, 347, 348];
//     const rightTroughIndices: number[] = [343, 349, 350, 351];

//     // 3. Calculate the average Z for each area
//     const leftPuffZ: number = calculateAverageZ(leftPuffIndices);
//     const leftTroughZ: number = calculateAverageZ(leftTroughIndices);

//     const rightPuffZ: number = calculateAverageZ(rightPuffIndices);
//     const rightTroughZ: number = calculateAverageZ(rightTroughIndices);

//     // 4. Calculate the Volume Score
//     // Because closer to camera = more negative Z:
//     // Trough (e.g., -0.02) - Puff (e.g., -0.06) = +0.04 (Positive Volume)
//     const leftEyeBagVolume: number = leftTroughZ - leftPuffZ;
//     const rightEyeBagVolume: number = rightTroughZ - rightPuffZ;

//     // 5. Get the final Combined Geometric Score
//     const totalEyeBagPuffinessScore: number = (leftEyeBagVolume + rightEyeBagVolume) / 2;

//     console.log("Left Eye Bag Volume:", leftEyeBagVolume);
//     console.log("Right Eye Bag Volume:", rightEyeBagVolume);
//     console.log("Final Eye Bag Puffiness Score:", totalEyeBagPuffinessScore);