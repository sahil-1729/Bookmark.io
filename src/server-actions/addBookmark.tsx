
'use server'
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

interface props {
    formData: data,
    path: string
}
type data = {
    categories: string,
    labels: [] | labelData[],
    link: string
}
type labelData = {
    id: string,
    text: string
}

export async function sendData({ formData, path }: props) {
    console.log('The recieved data ', formData)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (formData) {

        const bulkQuery = formData.labels.map(val => {
            return { user_id: user?.id, email: user?.email, categories: formData.categories, labels: val.text, link: formData.link }
        })
        console.log(bulkQuery)
        const { error } = await supabase
            .from('bookmarks')
            .insert(bulkQuery)
        console.log(error)
    }

    //removes the cached data on the specified path, thus refetching the data on that page for server components
    // revalidatePath(`/${path}`)

    redirect('/timeline')

    // return formData
}
