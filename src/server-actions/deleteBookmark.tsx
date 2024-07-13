
'use server'
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { fetchBookmark } from "@/types"

interface props {
    bookmark: fetchBookmark,
    path: string
}

export async function sendData({ bookmark }: props) {
    console.log('The recieved data ', bookmark)

    const supabase = createClient()

    if (bookmark) {
        const response = await supabase
            .from('bookamrks')
            .delete()
            .eq('id', bookmark.id)
        console.log(response)
    }

    revalidatePath(`/timeline`)

}
