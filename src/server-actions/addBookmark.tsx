
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
export async function generateEmbedding(messages: any) {
    // console.log(messages)

    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    const response = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: messages,
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

        let metadata: Array<string> = await GetMetadata(formData.link)

        // add the labels and categories to the array for creating embedding 
        const labels = formData.labels.map(val => val.text)
        // metadata = metadata.concat([formData.categories], labels)

        metadata = metadata.length > 0 ? metadata.filter((val) => {
            if (val.length > 0) {
                return val
            }
        }) : ["Untitled"]


        const embedding = await generateEmbedding(metadata) ? await generateEmbedding(metadata) : ""

        // generate embedding for categories and labels for filtered search results
        const category_label_embedding = await generateEmbedding([...labels, formData.categories]) ? await generateEmbedding([...labels, formData.categories]) : ""

        // thsi is for sharing bookmark feature by adding the list of unique categories in another table, but takes significant time
        // const { data } = await supabase
        //     .from('uq_category_bookmarks')
        //     .insert({
        //         user_id: user?.id,
        //         categories: formData.categories,
        //     }, { count: 'planned' })
        //     .select()
        // console.log(data)

        // if (data) {
        const { error, status, statusText } = await supabase
            .from('bookmarks')
            .insert({
                user_id: user?.id,
                email: user?.email,
                categories: formData.categories,
                labels: formData.labels,
                link: formData.link,
                metadata: metadata[0],
                vector: embedding,
                category_label_vector: category_label_embedding,
                // uq_category_id: data[0]?.id
            }, { count: 'planned' })
            .select()

        if (error) {
            return "failure"
        }
        // }

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
