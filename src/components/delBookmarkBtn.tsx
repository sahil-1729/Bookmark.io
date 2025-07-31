'use client'

import { Button } from "./ui/button"
import { Link, Trash } from "lucide-react"
import deleteBookmark from "../server-actions/deleteBookmark"

import { useRouter } from "next/navigation"
import { fetchBookmark } from "@/types"

export default function DeleteBookmarkBtn({ bookmarkId }: { bookmarkId: string }) {

    const router = useRouter()

    async function onDelete(bookmarkId: string) {
        // const bookmarkId = data.get('id')
        // console.log(data.get('id'))

        const result: Array<Object> | Object = await deleteBookmark({ bookmarkId: bookmarkId })
        const deletedBookmark: { data: fetchBookmark, message: string } | { message: string } = await deleteBookmark({ bookmarkId: bookmarkId })

        if ('data' in deletedBookmark) {
            console.log(deleteBookmark)
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

