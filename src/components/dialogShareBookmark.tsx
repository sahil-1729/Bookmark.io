"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,

} from "@/components/ui/dialog"
import { X } from 'lucide-react';
import { useEffect, useState } from "react"

import { toast } from 'sonner'
import { Switch } from './ui/switch'
import { Label } from './ui/label'

export default function DialogShareBookmark({ user_id, category }: { user_id: string, category: string }) {

    const [check, setCheck] = useState(false)
    // set some random url 
    const [url, setUrl] = useState("http://www.degree.sample.info/bear/taste?reward=channel#bells")
    const [publicUrl, setPublicUrl] = useState(false)

    useEffect(() => {

        const clear = async () => {
            const response = await fetch('/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: user_id, category: category, is_public: false })
            })
            const result = await response.json()

            const link = `${window.location.origin}/share/${result?.data?.token}?category=${category}`
            console.log(result.data)

            setUrl(link)
            setPublicUrl(result?.data?.isPublic)
        }
        clear()
    }, [])

    function formTrigger() {
        const shift: boolean = !check
        setCheck(shift)
    }



    return (
        <Dialog open={check}>
            <DialogTrigger asChild>
                <Button onClick={async () => {
                    formTrigger()
                }} className=" text-sm p-4">
                    <p>
                        share
                    </p>
                </Button>
            </DialogTrigger>
            <DialogContent className="primary sm:w-[32rem] sm:h-max w-full h-full">
                <DialogHeader>
                    <DialogTitle>
                        Share bookmarks
                    </DialogTitle>
                    <DialogDescription>
                        Make this category public
                    </DialogDescription>
                </DialogHeader>
                <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <X onClick={() => formTrigger()} className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogClose>
                <div className='flex flex-row gap-4'>
                    <Input type='password'
                        disabled={true}
                        value={url}
                    />
                    <Button
                        onClick={async () => {
                            await navigator.clipboard.writeText(url);
                            toast('link copied!')
                        }}
                    >Copy</Button>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch id="public"
                        defaultChecked={publicUrl}
                        onCheckedChange={async (checked) => {
                            setPublicUrl(checked)
                            // console.log(checked)

                            const response = await fetch('/api/visibility', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ user_id: user_id, category: category, is_public: checked })
                            })
                            const result = await response.json()
                            console.log(result)

                        }} />
                    <Label htmlFor="public">Public</Label>
                </div>

            </DialogContent>
        </Dialog >
    )


}



