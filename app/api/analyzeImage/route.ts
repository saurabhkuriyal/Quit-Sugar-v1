import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const formData = await req.formData()
        console.log("------>", formData);

        const image = formData.get("image");
        const days = formData.get("days");

        console.log("------>", image, days);

        return NextResponse.json({ image, days });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}