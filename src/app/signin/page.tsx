import Header from '@/components/Header(login-signup)/Header';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import OauthButton from '@/components/oauthButton';

export default async function Signin({
    searchParams,
}: {
    searchParams: { message: string };
}) {

    const signin = async (formData: FormData) => {
        'use server'

        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const supabase = createClient()
        // console.log(supabase)

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        console.log(error)
        if (error) {
            redirect('/signin?message= Signin Error: Email or Password not matched')
        }

        const { data: { user } } = await supabase.auth.getUser()
        // console.log(user.user_metadata.email_verified)

        redirect('/timeline')

    }

    return (
        <div>
            <Header />

            <Link
                href="/"
                className="py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover text-sm m-4"
            >
                Home
            </Link>

            <div className="w-full p-8 rounded-lg border-2 border-primary px-8 sm:max-w-md mx-auto mt-4">
                <form action={signin} className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mb-4">
                    <label className="text-md" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="rounded-md px-4 py-2  border-2 border-primary mb-6"
                        name="email"
                        placeholder=""
                        required
                    />
                    <label className="text-md" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="rounded-md px-4 py-2  border-2 border-primary mb-6"
                        type="password"
                        name="password"
                        placeholder=""
                        required
                    />
                    <button className="bg-primary text-secondary rounded-md px-4 py-2  mb-2">
                        Sign In
                    </button>

                    {searchParams?.message && (
                        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                            {searchParams.message}
                        </p>
                    )}
                </form>

                {/* <Link
                    href="/forgot-password"
                    className="rounded-md no-underline text-primary text-sm "
                >
                    Forgotten Password?
                </Link> */}

                {/* <br />
                <br /> */}

                <Link
                    href="/signup"
                    className="rounded-md no-underline text-foreground text-sm"
                >
                    Don&apos;t have an Account? Sign Up
                </Link>
                <br />

                <h1 className='text-2xl text-center my-4'>
                    OR
                </h1>

                <div className='flex justify-center'>
                    <OauthButton />
                </div>

            </div>
        </div>
    );
}
