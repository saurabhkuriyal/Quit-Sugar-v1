import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
    try {
        const formData = await req.formData()


        console.log("------>", formData);

        const image = formData.get("image") as File;
        const days = formData.get("days");

        console.log("------>", image, days);
        if (!image) {
            return NextResponse.json({
                error: "No image provided",
                status: 400,
                message: "Failed"
            })
        }

        //Converting file into buffer
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        //Uploading to cloudinary

        const uploadResponse = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({
                folder: "quit-sugar", //optional organization of images
            },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result)
                }
            );
            uploadStream.end(buffer)
        })

        console.log("Cloudinary response ", uploadResponse);


        return NextResponse.json({ success: true, message: "Success" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}