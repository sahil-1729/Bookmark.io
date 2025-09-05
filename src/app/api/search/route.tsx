
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";



const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Take a user's prompt and convert it to an embedding (vector) so it can be 
// compared to vectors in the database
async function generateEmbedding(message: string) {
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    const response = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: [message],
        config: {
            outputDimensionality: 1536,
        },
    });

    if (!response.embeddings || response.embeddings.length === 0) {
        throw new Error("No embeddings returned");
    }

    const embedding = response?.embeddings[0].values ? response?.embeddings[0].values : [];

    return embedding
}

// Fetch relevant chunks of information using the embedding generated embedding
export type dataChunk = {
    id: string,
    metadata: string,
    link: string,
    date_updated: string,
    similarity: number,
    user_id: string,
    categories: string,
    labels: Array<{
        id: string,
        text: string
    }>,
    visited: boolean
}

async function fetchRelevantContext(embedding: number[], filter: boolean) {
    const supabase = createClient();
    const { data: user } = await supabase.auth.getUser()
    // console.log(user.user?.id)


    const { data, error } = filter ? await supabase.rpc("get_relevant_bookmark_by_filter", {
        query_vector: embedding,
        match_threshold: 0.60,
        match_count: 10,
        users_id: user.user?.id ? user.user.id : 0
    }) : await supabase.rpc("get_relevant_chunks_bookmark", {
        query_vector: embedding,
        match_threshold: 0.55,
        match_count: 10,
        users_id: user.user?.id ? user.user.id : 0
    });

    console.log('filter ', filter, data)
    if (error) throw error;

    const relevantData = data.map(
        (value: dataChunk) => {
            // console.log(value.similarity)
            return {
                id: value.id,
                metadata: value.metadata,
                link: value.link,
                user_id: value.user_id,
                categories: value.categories,
                labels: value.labels,
                visited: value.visited
            }
        })

    return relevantData
}

// Calls the functions above to response to user input and return 
// AI generated responses using context from the database
export async function POST(req: Request) {
    try {
        const message: { query: string, filter: boolean } = await req.json();

        const embedding = await generateEmbedding(message.query);

        // console.log('generated embedding ', embedding)
        if (embedding && message.filter) {
            const context = await fetchRelevantContext(embedding, message.filter);

            return NextResponse.json({
                data: context,
                message: 'success'
            }, { status: 200 })

        }
        const context = await fetchRelevantContext(embedding, message.filter);
        // console.log(context)

        return NextResponse.json({
            data: context,
            message: 'success'
        }, { status: 200 })


    } catch (error) {
        console.log("Error generating response: " + error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 404 })

        throw error;
    }
}