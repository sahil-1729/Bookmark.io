
'use server'
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { GetMetadata } from "./getBookmark"

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
    console.log('recieved data - add bookmarks ', formData)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (formData) {

        const labelsList = formData.labels.map(val => val.text)

        let metadata = await GetMetadata(formData.link)
        metadata = metadata.length > 0 ? metadata : "Untitled"

        const { data } = await supabase
            .from('bookmarks')
            .insert({ user_id: user?.id, email: user?.email, categories: formData.categories, labels: labelsList, link: formData.link, metadata: metadata }, { count: 'planned' })
            .select()
        // console.log('added bookmark', data)
    }

    //removes the cached data on the specified path, thus refetching the data on that page for server components, which is abs necessary to get latest data

    revalidatePath(`${path}`)

    // redirect('/timeline')

    // return formData
}
