"use client"

import { ZodType, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
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
import { CirclePlus, X } from 'lucide-react';
import { useState } from "react"
import clsx from 'clsx';

import { formInterface, setBookmark } from "@/types"
import { useToggleContext } from "@/context/app-context"

import { sendData } from "./send-data"

const formSchema: ZodType<formInterface> = z.object({
    labels: z.string().min(2, {
        message: "label must be at least 2 characters.",
    }).max(50),
    categories: z.string().min(2, {
        message: "categories must be at least 2 characters.",
    }).max(50),
    link: z.string().min(2, {
        message: "link must be at least 2 characters.",
    }).max(1000).url({ message: "Invalid url" })
})

export default function DialogForm() {

    // const [bookmark, setBookmark] = useState<formInterface[]>(a)
    const { bookmarks, setBookmarks } = useToggleContext()

    // 1. Define your form.
    const [check, setCheck] = useState(false)
    const [formData, setForm] = useState<formInterface>()
    const [link, setLink] = useState<string>("")

    var form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            labels: "",
            categories: "",
            link: "",
        },
    })
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        //THIS FUNCTION WILL BE EXECUTED ONLY AFTER BEING VALIDATED BY ZOD 
        // if failed to validate then the function wont execute 

        // console.log('success ', values)
        setForm(values)
        form.reset()

        const addBookmarks = [...bookmarks, values]
        setBookmarks(addBookmarks)
        console.log(addBookmarks)

        updateUserWithId(values)

        shift()
    }

    const updateUserWithId = sendData.bind(null)

    function shift() {
        const shift: boolean = !check
        setCheck(shift)
    }

    console.log('the value ', form.watch('link'))

    return (
        <Dialog open={check}>
            <DialogTrigger ><CirclePlus onClick={() => {
                shift()
                form.reset()
            }} className="right-12 bottom-12 fixed" size={40} color="white" /></DialogTrigger>
            <DialogContent className="primary sm:w-[32rem] sm:h-max w-full h-full">
                <DialogHeader>
                    <DialogTitle>Add bookmark
                    </DialogTitle>
                    <DialogDescription>
                        Don't worry, we'll save you the trouble of finding this frustration again
                    </DialogDescription>
                </DialogHeader>
                <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <X onClick={() => shift()} className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogClose>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
                        <FormField
                            control={form.control}
                            name="link"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Link</FormLabel>
                                    <FormControl>
                                        <Input placeholder="CTRL + V" className="" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Copy, paste, pray it doesn't change (it probably will).
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="labels"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Labels</FormLabel>
                                    <FormControl>
                                        <Input placeholder="link associated to which topic?" className="" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Just so you dont forget why you add it :{")"}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="categories"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categories</FormLabel>
                                    <FormControl>
                                        <Input placeholder="where will this bookmark belong?" className="" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Helping you to organize your bookmarks
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                {/* <Button className="border-8 border-green-700" type="button" variant="secondary">
                            Discard
                        </Button> */}
                                <Button type="submit" onClick={() => {
                                    // const errorsList: object = form.formState
                                    // console.log(errorsList)
                                }} className={clsx('', {
                                    'hidden': !(form.getValues('categories')) || !(form.getValues('link')) || !(form.getValues('labels'))
                                })} >save</Button>

                            </DialogClose>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    )


}



