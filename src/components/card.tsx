'use server'

import { Button } from "./ui/button"
import { createClient } from "@/utils/supabase/server"
import { fetchBookmark } from "@/types"
import urlMetadata from 'url-metadata'
import { Trash } from "lucide-react"

const options = {
    // custom request headers
    requestHeaders: {
        'User-Agent': 'url-metadata/3.0 (npm module)',
        'From': 'example@example.com'
    },

    // `fetch` API cache setting for request
    cache: 'no-cache',

    // `fetch` API mode (ex: 'cors', 'no-cors', 'same-origin', etc)
    mode: 'cors',

    // charset to decode response with (ex: 'auto', 'utf-8', 'EUC-JP')
    // defaults to auto-detect in `Content-Type` header or meta tag
    // if none found, default `auto` option falls back to `utf-8`
    // override by passing in charset here (ex: 'windows-1251'):
    decode: 'auto',

    // timeout in milliseconds, default is 10 seconds
    timeout: 10000,

    // number of characters to truncate description to
    descriptionLength: 750,

    // force image urls in selected tags to use https,
    // valid for images & favicons with full paths
    ensureSecureImageRequest: true,

    // return raw response body as string
    includeResponseBody: false,

    // alternate use-case: pass in `Response` object here to be parsed
    // see example below
    parseResponseObject: null,
};

export async function GetData(link: string) {

    // async function run() {
    const url = link
    try {
        const metadata = await urlMetadata(url);
        console.log(metadata)
        // const data = await getMetaData(url)
        // console.log('api ', data.title)
        return metadata.title
        // return ""
    } catch (e) {
        console.log(e)
    }
    return null

    // console.log(data)
    // }
}

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
        if (data) {

            bookmarks = await Promise.all(data.map(async val => {
                const link = await GetData(val.link)
                console.log('card ', link)

                if (link) {
                    const res = { ...val, metadata: link }
                    // console.log(res)
                    return res
                }
                return { ...val, metadata: "Untitled" }
            }))

        }

    }

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
                    <div className="flex justify-between">
                        <a href={val.link} target="_blank" className="scroll-m-20 text-2xl font-semibold tracking-tight break-all lg:text-4xl">{val.metadata}</a>
                        <Button size='sm' >< Trash size={16} /></Button>
                    </div>
                    <a href={val.link} target="_blank" className="text-sm font-medium leading-none break-all">{val.link}</a>

                    <Button variant="outline" size="sm" className="max-w-max">{val.categories}</Button>
                    <div className="border-primary border px-2 py-1 max-w-max rounded-lg">
                        {val.labels}
                    </div>
                </div>
            )
        })
    }
    return <>Something went wrong</>
} 