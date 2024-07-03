// "use client"

// import { z } from "zod"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { Button } from "@/components/ui/button"
// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"

// const formSchema = z.object({
//     labels: z.string().min(2, {
//         message: "label must be at least 2 characters.",
//     }).max(50),
//     categories: z.string().min(2, {
//         message: "categories must be at least 2 characters.",
//     }).max(50),
//     link: z.string().min(2, {
//         message: "link must be at least 2 characters.",
//     }).max(100)
// })

// export function ProfileForm() {
//     // 1. Define your form.
//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             labels: "",
//             categories: "",
//             link: "",
//         },
//     })

//     // 2. Define a submit handler.
//     function onSubmit(values: z.infer<typeof formSchema>) {
//         // Do something with the form values.
//         // ✅ This will be type-safe and validated.
//         console.log(values)
//     }

//     return (
//         <Form {...form} >
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
//                 <FormField
//                     control={form.control}
//                     name="labels"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Labels</FormLabel>
//                             <FormControl>
//                                 <Input placeholder="shadcn" className="text-black" {...field} />
//                             </FormControl>
//                             <FormDescription>
//                                 This will be your labels.
//                             </FormDescription>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     control={form.control}
//                     name="categories"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Categories</FormLabel>
//                             <FormControl>
//                                 <Input placeholder="shadcn" className="text-black" {...field} />
//                             </FormControl>
//                             <FormDescription>
//                                 This will be your categories.
//                             </FormDescription>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     control={form.control}
//                     name="link"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Link</FormLabel>
//                             <FormControl>
//                                 <Input placeholder="shadcn" className="text-black" {...field} />
//                             </FormControl>
//                             <FormDescription>
//                                 This will be your link.
//                             </FormDescription>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <Button type="submit">Submit</Button>
//             </form>
//         </Form>
//     )
// }