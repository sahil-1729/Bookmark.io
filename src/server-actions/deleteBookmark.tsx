
'use server'
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

interface props {
    bookmarkId: string,
}

export default async function deleteData({ bookmarkId }: props) {
    console.log('recieved data - delete bookmarks', bookmarkId)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (bookmarkId && user) {
        const { error, data } = await supabase
            .from('bookmarks')
            .delete({ count: 'planned' })
            .eq('id', bookmarkId)
            .eq('user_id', user.id)
            .select()
        // .match({ id: bookmarkId,user_id: user.id  })

        // console.log('data recieved - delete operation ', data)


        if (error) {
            console.error('Error deleting data', error)
            return;
        }

        // revalidatePath to tell server to refresh the data 
        revalidatePath('/')
    }

    //here it didn't work bc it was revalidating path before the bookmark was deleted
    // revalidatePath(`/`)

}
