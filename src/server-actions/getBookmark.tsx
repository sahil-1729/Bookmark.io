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
    return null

    // console.log(data)
    // }
}

export default async function getBookmark() {

    var bookmarks: fetchBookmark[] | null = []
    const supabase = createClient()
    const { data: { session }, error } = await supabase.auth.getSession()

    const { data: { user } } = await supabase.auth.getUser()

    if (session && user) {

        const { data, error } = await supabase
            .from('bookmarks')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })

        console.log('getBookmark.tsx - bookmarks list', data, error)
        if (data) {

            bookmarks = await Promise.all(data.map(async val => {
                const link = await GetMetadata(val.link)
                // console.log('card ', link)

                if (link) {
                    const res = { ...val, metadata: link }
                    // console.log(res)
                    return res
                }
                return { ...val, metadata: "Untitled" }
            }))
            return bookmarks
        }
        return []
    }

    return []
    // return { message: "Something went wrong" }

}