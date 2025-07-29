
'use server'
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"

interface props {
    bookmarkId: string,
}

export default async function deleteData({ bookmarkId }: props) {

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    var result;
    if (bookmarkId && user) {
        const { error, data } = await supabase
            .from('bookmarks')
            .delete({ count: 'planned' })
            .eq('id', bookmarkId)
            .eq('user_id', user.id)
            .select()
        // .match({ id: bookmarkId,user_id: user.id  })

        console.log('recieved data - delete bookmarks', data)

        if (error) {
            console.error('Error deleting data', error)
            return;
        }

    }
    // revalidatePath to tell server to refresh the data 
    const headerList = await headers();
    const pathname = headerList.get("x-current-path");
    revalidatePath(`${pathname}`)
    console.log('path changed - delete')
}
