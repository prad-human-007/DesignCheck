import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { messages } = await req.json();

    console.log("Messages received:", messages);
    
    return NextResponse.json({ message: "This is a mock response",})
}