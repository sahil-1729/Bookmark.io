import Header from '@/components/Header(login-signup)/Header';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

export default async function Signup({
    searchParams,
}: {
    searchParams: { message: string };
}) {

    const origin = headers().get('origin')

    const signup = async (formData: FormData) => {
        'use server'
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const confirmpassword = formData.get('confirmPassword') as string
        if (password != confirmpassword) {
            // console.log('works ', formData.get('confirmPassword'), formData.get('password'))
            redirect('/signup?message=Passwords do not match ')
        }

        const supabase = createClient()
        // console.log(supabase)
        const { error } = await supabase.auth.signUp({
            email, password,
            //to login the user in browser, after the email is authenticated
            options: {
                emailRedirectTo: `${origin}/auth/callback`
            }
        })
        console.log(error)
        if (error) {
            redirect('/signup?message=Email already in use or could not authenticate user')
        }

        const { data: { user } } = await supabase.auth.getUser()
        // console.log(user.user_metadata.email_verified)
        if (user && !user.user_metadata.email_verified) {
            redirect('/timeline')
        } else {
            redirect(`/confirm?message= check your email - ${email} to continue sign in process`)
        }
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

            <div className="w-full px-8 sm:max-w-md mx-auto mt-4 bg-black rounded-lg border-2 border-primary p-8">
                <form action={signup} className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mb-4">
                    <label className="text-md" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="rounded-md px-4 py-2 bg-inherit border mb-6"
                        name="email"
                        placeholder=""
                        required
                    />
                    <label className="text-md" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="rounded-md px-4 py-2 bg-inherit border mb-6"
                        type="password"
                        name="password"
                        placeholder=""
                        required
                    />
                    <label className="text-md" htmlFor="password">
                        Confirm Password
                    </label>
                    <input
                        className="rounded-md px-4 py-2 bg-inherit border mb-6"
                        type="password"
                        name="confirmPassword"
                        placeholder=""
                        required
                    />
                    <button type='submit' className="text-secondary rounded-md px-4 py-2 bg-primary mb-2">
                        Sign up
                    </button>

                    {searchParams?.message && (
                        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                            {searchParams.message}
                            {/* {console.log(searchParams.message)} */}
                        </p>
                    )}
                </form>

                <Link
                    href="/login"
                    className="rounded-md no-underline text-foreground text-sm"
                >
                    Already have an account? Sign In
                </Link>
            </div>
        </div>
    );
}
