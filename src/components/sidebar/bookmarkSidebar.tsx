"use server"

import { createClient } from "@/utils/supabase/server"
import { Sidebar } from "./sidebar"
import { fetchBookmark } from "@/types"
import GetBookmark from "@/server-actions/getBookmark"

export default async function BookmarkSidebar() {

    var bookmarks: fetchBookmark[] | null = []
    const supabase = createClient()
    const { data: { session }, error } = await supabase.auth.getSession()

    const { data: { user } } = await supabase.auth.getUser()

    if (session && user) {

        const data = await GetBookmark()
        // console.log(data, error)
        const result: fetchBookmark[] | [] = data
        bookmarks = result === null ? [] : result

    }


    // if (bookmarks) {
    const categories: string[] | [] = bookmarks.map(val => val.categories)
    // console.log(categories)

    return <Sidebar categories={categories} />
    // }

    // return;
}