import dbConnect from "@/utils/db";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
        console.log("landmarks", newResult.faceLandmarks[0]);

        const calculateDistance = (point1: any, point2: any) => {
            return Math.sqrt(
                Math.pow(point2.x - point1.x, 2) +
                Math.pow(point2.y - point1.y, 2) +
                Math.pow(point2.z - point1.z, 2)
            );
        };

        const faceWidth = calculateDistance(newResult.faceLandmarks[0][234], newResult.faceLandmarks[0][454]);
        const faceHeight = calculateDistance(newResult.faceLandmarks[0][10], newResult.faceLandmarks[0][152]);
        const puffinessRatio = faceWidth / faceHeight;

        console.log("puffinessRatio", puffinessRatio);



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