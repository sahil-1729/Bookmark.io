
'use server'
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

interface props {
    bookmarkId: string,
    // path: string
}

export default async function deleteData({ bookmarkId }: props) {
    console.log('The recieved data ', bookmarkId)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (bookmarkId && user) {
        const { error } = await supabase
            .from('bookmarks')
            .delete()
            .match({ id: bookmarkId, user_id: user.id })

        if (error) {
            console.error('Error deleting data', error)
            return;
        }
    }
    // console.log(path)
    //here it didn't work bc it was revalidating path before the bookmark was deleted
    // revalidatePath(`/`)

}
