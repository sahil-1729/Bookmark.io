
'use server'

import { createClient } from "@/utils/supabase/server"


export async function sendData(formData) {
    console.log('The recieved data ', formData)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase
        .from('bookmarks')
        .insert({ user_id: user?.id, email: user?.email, categories: formData.categories, labels: formData.labels, link: formData.link })

    console.log(error)
}
