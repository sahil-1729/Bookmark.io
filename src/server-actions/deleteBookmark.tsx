
'use server'
import { createClient } from "@/utils/supabase/server"

interface props {
    bookmarkId: string,
}

export default async function deleteData({ bookmarkId }: props) {

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

        console.log('recieved data - delete bookmarks', data?.[0])

        if (error) {
            console.error('Error deleting data', error)
            return { message: "failed" };
        }

        if (data.length > 0) {
            return { data: data?.[0], message: "success" }
        }
    }

    return { message: "Something went wrong" }
}
