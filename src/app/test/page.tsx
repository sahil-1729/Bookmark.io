"use server"
import { createClient } from "@/utils/supabase/server"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function test() {


    const origin = headers().get('origin')

    const login = async () => {
        "use server"

        const supabase = createClient()
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${origin}`,
            },
        })
        console.log(data.url)
        if (data.url) {
            redirect('/timeline') // use the redirect API for your server framework
        }
    }


    return <div>
        hehe
        <form action={login}>
            <button >Login using google</button>
        </form>
    </div>
}