'use client'

import { Button } from "./ui/button"
import { Trash } from "lucide-react"
import deleteBookmark from "../server-actions/deleteBookmark"

import { useRouter } from "next/navigation"

export default function DeleteBookmarkBtn({ bookmarkId }: { bookmarkId: string }) {

    const router = useRouter()

    async function onDelete(bookmarkId: string) {
        // const bookmarkId = data.get('id')
        // console.log(data.get('id'))

        const result: Array<Object> | Object = await deleteBookmark({ bookmarkId: bookmarkId })

        if (Array.isArray(result)) {
            router.refresh()
            return
        }

        console.log(result)
    }
    return (
        <>
            <Button key={bookmarkId} size='sm' onClick={() => {
                onDelete(bookmarkId)
            }}>
                < Trash size={16} />
            </Button>
        </>
    )

} 