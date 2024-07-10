'use server'

import { Button } from "./ui/button"
import { createClient } from "@/utils/supabase/server"
import { fetchBookmark } from "@/types"

export default async function Card() {

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
        bookmarks = data

    }

    // console.log(bookmarks)

    if (bookmarks) {
        return bookmarks.length <= 0 ? <div className="bg-background p-4 border-primary border rounded-md flex flex-col gap-4 mx-4 mb-4 md:mb-8 ">
            <h5 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Looks like nothing here ...</h5>
            <Button variant="outline" size="sm" className="max-w-max">Click on the add icon</Button>
            <div className="border-primary border px-2 py-1 max-w-max rounded-lg">
                to add bookmark!
            </div>
        </div> : bookmarks.map((val: fetchBookmark, key: number) => {
            const temp = val.link.substr(0, 100) + "...";
            val.link = val.link.length > 100 ? temp : val.link;

            return (
                <div key={key} className="bg-background p-4 border-primary border rounded-md flex flex-col gap-4 mx-4 mb-4 md:mb-8 ">
                    <a href={val.link} target="_blank" className="scroll-m-20 text-2xl font-semibold tracking-tight break-all lg:text-4xl">{val.link}</a>
                    <Button variant="outline" size="sm" className="max-w-max">{val.categories}</Button>
                    <div className="border-primary border px-2 py-1 max-w-max rounded-lg">
                        {val.labels}
                    </div>
                </div>
            )
        })
    }
    return
} 