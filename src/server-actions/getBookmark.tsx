// make sure to use 'use server' when you are using client component to call server component(like calling Getbookmark from client component deleteBookmarkBtn ) 
'use server'

import { fetchBookmark } from "@/types";
import { createClient } from "@/utils/supabase/server";
import urlMetadata from "url-metadata";

export async function GetMetadata(link: string) {

    // async function run() {
    const url = link
    try {
        const metadata = await urlMetadata(url);
        // console.log(metadata)

        return metadata.title
    } catch (e) {
        // console.log(e)
    }
    return ""

    // console.log(data)
    // }
}

const CreateSession = async () => {
    const supabase = createClient()
    const { data: { session }, error } = await supabase.auth.getSession()

    const { data: { user } } = await supabase.auth.getUser()
    return { session, user, supabase }
}

export default async function GetBookmark() {
    var bookmarks: fetchBookmark[] | null = []
    const { session, user, supabase } = await CreateSession()

    if (session && user) {

        const { data, error } = await supabase
            .from('bookmarks')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })

        // console.log('getBookmark.tsx ', data)
        if (data) {

            // bookmarks = await Promise.all(data.map(async val => {
            //     const link = await GetMetadata(val.link)
            //     // console.log('card ', link)

            //     if (link.length > 0) {
            //         const res = { ...val, metadata: link }
            //         // console.log(res)
            //         return res
            //     }
            //     return { ...val, metadata: "Untitled" }
            // }))

            // revalidatePath to tell server to refresh the data 
            // const headerList = await headers();
            // const pathname = headerList.get("x-current-path");
            bookmarks = data
            return data
        }
        return []
    }

    return []
    // return { message: "Something went wrong" }

}