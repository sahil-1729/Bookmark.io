
'use server'
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

interface props {
    formData: data,
    path: string
}
type data = {
    categories: string,
    labels: string,
    link: string
}



export async function sendData({ formData, path }: props) {
    console.log('The recieved data ', formData)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (formData) {
        const { error } = await supabase
            .from('bookmarks')
            .insert({ user_id: user?.id, email: user?.email, categories: formData.categories, labels: formData.labels, link: formData.link })
        console.log(error)
    }
    //removes the cached data on the specified path, thus refetching the data on that page
    revalidatePath(`/${path}`)
    // return formData
}
