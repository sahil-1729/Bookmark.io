'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState, useEffect } from "react"
import { GetUserName } from "./User"
import Link from "next/link"

export default function DialogLogin() {

    const [shift, setShift] = useState<boolean>(false)

    useEffect(() => {
        const getUser = async () => {
            const response: string | number = await GetUserName()
            if (!response) {
                setShift(true)
            }
        }
        getUser()
    }, [])

    return <AlertDialog open={shift}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Please log in</AlertDialogTitle>
                <AlertDialogDescription>
                    Collect, save, and organize your content — websites, newsletters, feeds, articles, and much more. All in one place.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
                <Link href="/">
                    <AlertDialogAction>Login</AlertDialogAction>
                </Link>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

}