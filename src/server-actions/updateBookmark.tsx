
'use server'
import { fetchBookmark } from "@/types"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

interface props {
    bookmark: fetchBookmark,
    path: string
}

export default async function UpdateBookmark({ bookmark, path }: props) {
    console.log('The recieved data ', bookmark)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        console.log('User is not authenticated')
        return
    }

    if (bookmark && user) {

        try {
            const { status, error } = await supabase
                .from('bookmarks')
                .update({
                    categories: bookmark.categories,
                    labels: bookmark.labels
                }, { count: "planned" })
                .eq('id', bookmark.id)
                .eq('user_id', user.id)

            // console.log(status)
            revalidatePath(`${path}`)

        } catch (e) {
            console.error('Error deleting data', e)
            return;
        }

    }



    //here it didn't work bc it was revalidating path before the bookmark was deleted
    // revalidatePath(`/`)

}
