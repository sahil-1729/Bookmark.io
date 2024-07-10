"use server"

import { createClient } from "@/utils/supabase/server"
import { Sidebar } from "./sidebar"

export default async function BookmarkSidebar() {

    var bookmarks = []
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
        bookmarks = data
    }
    const categories = bookmarks.map(val => val.categories)
    console.log(categories)
    return <Sidebar categories={categories} />
}