
'use server'
import { fetchBookmark } from "@/types"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { generateEmbedding } from "./addBookmark"

interface props {
    bookmark: fetchBookmark,
    path: string
}

export default async function UpdateBookmark({ bookmark, path }: props) {
    // console.log('The recieved data for udpate ', bookmark)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        console.log('User is not authenticated')
        return
    }

    if (bookmark && user) {

        try {

            const labels = bookmark.labels.map(val => val.text)
            const category_label_embedding = await generateEmbedding([...labels, bookmark.categories]) ? await generateEmbedding([...labels, bookmark.categories]) : ""

            const { status, error } = await supabase
                .from('bookmarks')
                .update({
                    categories: bookmark.categories,
                    labels: bookmark.labels,
                    category_label_vector: category_label_embedding
                }, { count: "planned" })
                .eq('id', bookmark.id)
                .eq('user_id', user.id)

            // console.log('update bookmark ', status)
            revalidatePath(`${path}`)

        } catch (e) {
            console.error('Error deleting data', e)
            return;
        }

    }

    //here it didn't work bc it was revalidating path before the bookmark was deleted
    // revalidatePath(`/`)

}
