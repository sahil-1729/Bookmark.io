'use server'

import { Button } from "./ui/button"
import { createClient } from "@/utils/supabase/server"
import { fetchBookmark } from "@/types"
import urlMetadata from 'url-metadata'
import { BookOpenCheck, Trash } from "lucide-react"
import deleteBookmark from "../server-actions/deleteBookmark"
import { revalidatePath } from "next/cache"
import { Toggle } from "./ui/toggle"
import ToggleVisit from "./toggleVisit"
import { redirect } from "next/navigation"
import getBookmark from "@/server-actions/getBookmark"


export default async function Card() {

    var bookmarks: fetchBookmark[] | null = []

    bookmarks = await getBookmark()
    console.log(bookmarks)
    async function deleteB(data: any) {
        "use server"
        const bookmarkId = data.get('id')
        console.log(data.get('id'))
        await deleteBookmark({ bookmarkId: bookmarkId })

        // revalidatePath('/timeline')
        redirect('/timeline')
    }

    if (bookmarks) {

        return bookmarks.length <= 0 ? <div className="bg-background p-4 border-primary border rounded-md flex flex-col gap-4 mx-4 mb-4 md:mb-8 ">
            <h5 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Looks like nothing here ...</h5>
        </div> : bookmarks.map((val: fetchBookmark, key: number) => {
            const temp = val.link.substr(0, 100) + "...";
            val.link = val.link.length > 100 ? temp : val.link;

            return (
                <div key={key} className="bg-background p-4 border-primary border rounded-md flex flex-col gap-4 mx-4 mb-4 md:mb-8 ">
                    <div className="flex justify-between">
                        <a href={val.link} target="_blank" className="scroll-m-20 text-2xl font-semibold tracking-tight break-all lg:text-4xl">{val.metadata}</a>
                        <form action={deleteB} >
                            <input name='id' className="hidden" defaultValue={val.id} />
                            <Button size='sm' >< Trash size={16} /></Button>
                        </form>
                    </div>
                    <a href={val.link} target="_blank" className="text-sm font-medium leading-none break-all">{val.link}</a>

                    <Button variant="outline" size="sm" className="max-w-max">{val.categories}</Button>
                    <div className="flex justify-between items-center">

                        <div className="flex flex-wrap gap-4">
                            {val.labels ? val.labels.map((value, key) =>
                                <div key={key} className="border-primary border px-2 py-1 max-w-max rounded-lg">
                                    {value}
                                </div>
                            ) : ""}
                        </div>
                        <ToggleVisit id={val.id} visited={val.visited ? val.visited : false} />
                    </div>
                </div>
            )
        })
    }
    return <>Something went wrong</>
} 