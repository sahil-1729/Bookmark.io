'use client'

import { Button } from "./ui/button"
import { Trash } from "lucide-react"
import deleteBookmark from "../server-actions/deleteBookmark"

import { useRouter } from "next/navigation"

export default function Card({ bookmarkId }: { bookmarkId: string }) {

    const router = useRouter()
    // const [bookmarks, setBookmarks] = useState(fetchedBookmarks)

    async function onDelete(data: any) {
        const bookmarkId = data.get('id')
        // console.log(data.get('id'))

        const result: Array<Object> | Object = await deleteBookmark({ bookmarkId: bookmarkId })

        if (Array.isArray(result)) {
            router.refresh()
        }

        console.log(result)
    }
    return (<form action={onDelete} >
        <input name='id' className="hidden" defaultValue={bookmarkId} />
        <Button type="submit" size='sm' >< Trash size={16} /></Button>
    </form>)

} 