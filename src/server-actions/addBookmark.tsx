
'use server'
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { GetMetadata } from "./getBookmark"
import { GoogleGenAI } from "@google/genai"

interface props {
    formData: data,
    path?: string
}
type data = {
    categories: string,
    labels: [] | labelData[],
    link: string
}
type labelData = {
    id: string,
    text: string
}
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Take a user's prompt and convert it to an embedding (vector) so it can be 
// compared to vectors in the database
async function generateEmbedding(message: string) {
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    const response = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: message,
        config: {
            outputDimensionality: 1536,
        },
    });

    if (!response.embeddings || response.embeddings.length === 0) {
        throw new Error("No embeddings returned");
    }

    const embedding = response?.embeddings[0].values;
    return embedding
}

export async function sendData({ formData, path }: props) {
    // console.log('recieved data - add bookmarks ', formData)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (formData) {

        // console.log(formData.labels)

        let metadata = await GetMetadata(formData.link)
        metadata = metadata.length > 0 ? metadata : "Untitled"

        const embedding = await generateEmbedding(metadata) ? await generateEmbedding(metadata) : ""

        const { data, error, status, statusText } = await supabase
            .from('bookmarks')
            .insert({
                user_id: user?.id,
                email: user?.email,
                categories: formData.categories,
                labels: formData.labels,
                link: formData.link,
                metadata: metadata,
                vector: embedding
            }, { count: 'planned' })
            .select()

        if (error) {
            return "failure"
        }
        // refer docs - https://supabase.com/docs/reference/javascript/select
        // console.log('added bookmark', data, status, statusText, error)
    }

    //removes the cached data on the specified path, thus refetching the data on that page for server components, which is abs necessary to get latest data
    if (path) {
        revalidatePath(`${path}`)
    }

    return "success"

    // redirect('/timeline')
}
