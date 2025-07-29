"use client"
import { usePathname, useRouter } from 'next/navigation'
import { ZodType, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
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
import { SetStateAction, useState } from "react"
import clsx from 'clsx';

import { formInterface } from "@/types"

import { sendData } from "../server-actions/addBookmark"
import { Tag, TagInput } from 'emblor';
import { cn } from '@/lib/utils'

const formSchema: ZodType<formInterface> = z.object({
    // labels: z.string().min(2, {
    //     message: "label must be at least 2 characters.",
    // }).max(50),
    categories: z.string().min(2, {
        message: "categories must be at least 2 characters.",
    }).max(50),
    link: z.string().min(0, {
        message: "link cannot be empty.",
    }).max(1000).url({ message: "Invalid url" }),
    labels: z.array(
        z.object({
            id: z.string(),
            text: z.string(),
        }),
    ),
})

export default function DialogForm() {

    // 1. Define your form.
    const [check, setCheck] = useState(false)
    const [formData, setForm] = useState<formInterface>()

    const [tags, setTags] = useState<Tag[]>([]);
    const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

    var form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            // labels: "",
            categories: "",
            link: "",
            labels: []
        },
    })

    const pathname = usePathname()
    const updateUserWithId = sendData.bind(null)

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        //THIS FUNCTION WILL BE EXECUTED ONLY AFTER BEING VALIDATED BY ZOD 
        // if failed to validate then the function wont execute 

        // console.log('success ', values)
        // setForm(values)
        form.reset()
        setTags([])
        updateUserWithId({ formData: values, path: pathname })

        shift()
    }

    function shift() {
        const shift: boolean = !check
        setCheck(shift)
    }


    // console.log('the value ', form.watch('link'))

    return (
        <Dialog open={check}>
            <DialogTrigger asChild>
                {/* <CirclePlus onClick={() => {
                    shift()
                    form.reset()
                }} className="right-12 bottom-12 fixed " size={40} color="white" /> */}
                <Button onClick={() => {
                    shift()
                    form.reset()
                }} className="right-12 bottom-12 fixed ">
                    Add bookmark
                </Button>
            </DialogTrigger>
            <DialogContent className="primary sm:w-[32rem] sm:h-max w-full h-full">
                <DialogHeader>
                    <DialogTitle>Add bookmark
                    </DialogTitle>
                    <DialogDescription>
                        Don&apos;t worry, we&apos;ll save you the trouble of finding this frustration again
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
                                        <Input placeholder="CTRL + V" className="border border-primary" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Copy + paste
                                        {/* pray it doesn&apos;t change (it probably will). */}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* <FormField
                            control={form.control}
                            name="labels"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Context</FormLabel>
                                    <FormControl>
                                        <Input placeholder="link associated to which topic?" className="" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Just so you dont forget why you add it :{")"}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        <FormField
                            control={form.control}
                            name="categories"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categories</FormLabel>
                                    <FormControl>
                                        <Input placeholder="where will this bookmark belong?" className="border border-primary" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Helping you to organize your bookmarks
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="labels"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-start">
                                    <FormLabel className="text-left">Context</FormLabel>
                                    <FormControl className="max-w-full">
                                        <TagInput
                                            styleClasses={{
                                                inlineTagsContainer: 'border-primary border p-2 rounded-lg',
                                            }}
                                            customTagRenderer={
                                                (tag, isActiveTag) => (<
                                                    div key={
                                                        tag.id
                                                    }
                                                    className={
                                                        `px-2 py-1 bg-primary rounded-full ${isActiveTag ? "ring-ring ring-offset-2 ring-2 ring-offset-background" : ""}`
                                                    } >
                                                    <span className="text-primary-foreground text-sm mr-1 flex flex-row" >
                                                        {
                                                            tag.text
                                                        }
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            onClick={(e) => {
                                                                e.stopPropagation(); // Prevent event from bubbling up to the tag span
                                                                // onRemoveTag(tag.id);
                                                                const res = tags.filter(val => val.id != tag.id)
                                                                setTags(res)
                                                                form.setValue('labels', res as [Tag, ...Tag[]])
                                                            }}
                                                            className={cn('py-1 px-1 h-full hover:bg-transparent')}
                                                        >
                                                            <X size={14} />
                                                        </Button>
                                                    </span>
                                                </div>
                                                )
                                            }

                                            // direction={'row'}
                                            showCount={true}
                                            // maxTags={3}
                                            // truncate={tags.length}

                                            variant={{
                                                variant: "primary",
                                                shape: "rounded",
                                            }}
                                            activeTagIndex={activeTagIndex}
                                            setActiveTagIndex={setActiveTagIndex}
                                            {...field}
                                            placeholder="link associated to which topic?"
                                            tags={tags}

                                            className="resize-y flex flex-wrap"
                                            setTags={(newTags) => {
                                                // console.log(newTags)
                                                setTags(newTags)
                                                form.setValue('labels', newTags as [Tag, ...Tag[]])
                                            }} />

                                    </FormControl>
                                    <FormDescription className="text-left">
                                        Just so you dont forget why you add it :{")"}
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



