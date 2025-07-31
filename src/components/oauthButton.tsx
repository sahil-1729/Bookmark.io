'use client'
import { createClient } from "@/utils/supabase/client"
import { Button } from "./ui/button"
import Image from "next/image"


const OauthButton = () => {

    async function signinGoogle() {

        const supabase = createClient()

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })

        if (error) {
            console.log(error.message)
            return
        }
        // if (data.url) {
        //     window.location.href = data.url
        // }
    }

    return (
        <Button onClick={() => {
            console.log("hello world")
            signinGoogle()
        }}
            className="flex flex-row gap-2 p-6"
        >
            <p className="text-md md:text-lg" >
                Login using Google
            </p>
            <Image src="google.png" alt="google" width={28} height={28} />
        </Button>
    )
}

export default OauthButton