"use server"

import { createClient } from "@/utils/supabase/server"
import { Sidebar } from "./sidebar"
import { fetchBookmark } from "@/types"

export default async function BookmarkSidebar() {

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

        // console.log(data, error)
        const result: fetchBookmark[] | null = data
        bookmarks = result
    }
    if (bookmarks) {
        const categories = bookmarks.map(val => val.categories)
        console.log(categories)
        return <Sidebar categories={categories} />
    }
    return;
}