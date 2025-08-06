'use client'

import { Button } from "./ui/button"
import { Link, Trash } from "lucide-react"
import deleteBookmark from "../server-actions/deleteBookmark"

import { useRouter } from "next/navigation"
import { fetchBookmark } from "@/types"
import { toast } from "sonner"

export default function DeleteBookmarkBtn({ bookmarkId }: { bookmarkId: string }) {

    const router = useRouter()

    async function onDelete(bookmarkId: string) {
        // const bookmarkId = data.get('id')
        // console.log(data.get('id'))

        const deletedBookmark: { data: fetchBookmark, message: string } | { message: string } = await deleteBookmark({ bookmarkId: bookmarkId })

        if ('data' in deletedBookmark) {
            console.log(deletedBookmark)
            router.refresh()
            return
        }

        console.log(deletedBookmark.message)
    }

    return (
        <>
            <Button key={bookmarkId} size='sm' onClick={() => {
                onDelete(bookmarkId)

                toast("Deleting bookmark...")
                setTimeout(() => {
                    toast("Bookmark has been deleted")
                }, 3500)
            }}>
                < Trash size={16} />
            </Button>
        </>
    )

}

