import { CreateSession } from "./getBookmark"



export default async function VerifyToken(access_token: string, category: string) {
    var bookmarks: any = []
    const { supabase } = await CreateSession()

    const { data, error } = await supabase
        .from('uq_category_bookmarks')
        .select('*')
        .eq('categories', category)
        .eq('access_token', access_token)

    console.log('Verify.tsx ', data)
    if (data != undefined && data.length > 0 && data[0]?.is_public === true) {

        const response = await supabase
            .from('bookmarks')
            .select('*')
            .eq('user_id', data[0]?.user_id)
            .eq('categories', category)
            .order('created_at', { ascending: false })

        // console.log(response?.data)
        bookmarks = response?.data
        bookmarks = bookmarks.map((value: any) => {
            return {
                id: value.id,
                user_id: value.user_id,
                categories: value.categories,
                labels: value.labels,
                link: value.link,
                visited: value.visited,
                metadata: value.metadata,
            }
        })
        return bookmarks
    }
    return []

    // return { message: "Something went wrong" }
}