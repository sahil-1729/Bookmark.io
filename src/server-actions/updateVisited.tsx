
'use server'
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

interface props {
    bookmarkId: string,
    visited: boolean
}

export default async function UpdateVisited({ bookmarkId, visited }: props) {
    console.log('The recieved data ', bookmarkId)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        console.log('User is not authenticated')
        return
    }

    // console.log('before visited - ', visited)
    // visited = !visited
    // console.log('after visited - ', visited)

    if (bookmarkId && user) {
        const { error } = await supabase
            .from('bookmarks')
            .update({
                visited: visited
            })
            .match({ id: bookmarkId, user_id: user.id })

        if (error) {
            console.error('Error deleting data', error)
            return;
        }
    }



    //here it didn't work bc it was revalidating path before the bookmark was deleted
    // revalidatePath(`/`)

}
