import { NextResponse } from "next/server";
import OpenAI from "openai";
import {QdrantClient} from '@qdrant/js-client-rest';
import { GoogleGenAI } from "@google/genai";


const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const qdrantClient = new QdrantClient({
    url: process.env.QDRANT_URL,
    apiKey: process.env.QDRANT_API_KEY,
    port: 6333,
});

const collectionName = process.env.QDRANT_COLLECTION_NAME || "embeddings";

type Message = {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export async function POST(req: Request) {
    const { messages }: { messages: Message[] } = await req.json();
    if(!messages || messages.length === 0) {
        return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }
    
    const last_message = messages[messages.length - 1].content;
    // Query qdrantClient to get similar matching pages. 

    const vector = await gemini.models.embedContent({
        model:"gemini-embedding-exp-03-07",
        contents: last_message,
        config: {
            taskType: "RETRIEVAL_DOCUMENT"
        }
    })
    let context = ''
    if (vector.embeddings && vector.embeddings.length > 0) {
        console.log("Got Vector Embeddings");
        const points = await qdrantClient.query(collectionName, {
            query: vector.embeddings[0].values,
            params: { hnsw_ef: 128, exact: false },
            limit: 5,
            with_payload: true
        })
        // console.log("Points: ", points.points);
        // Join all the points 
        context = points.points.map(point => point.payload!.text).join("\n");
        console.log("Context: ", context);
    } else {
        console.error("Vector embeddings are undefined or empty.");
    }

    messages[messages.length - 1].content = last_message + "\n Answer the above question using the context provided below" + context;
    
    const response = await openai.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: messages,
        stream: true
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        async start(controller) {
            try {
                for await (const chunk of response) {
                    const content = chunk.choices[0].delta.content || "";
                    controller.enqueue(encoder.encode(content));
                }
                controller.close();
            } catch (error) {
                controller.error(error);
            }
        }
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-cache",
        },
    });
}