import Header from '@/components/Header(login-signup)/Header';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';

export default async function ForgotPassword({
    searchParams,
}: {
    searchParams: { message: string };
}) {

    const confirmReset = async (formData: FormData) => {
        'use server'
        const origin = headers().get('origin')
        const email = formData.get('email') as string

        const supabase = createClient()
        // console.log(supabase)

        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${origin}/reset-password`,
        })

        console.log(error)
        if (error) {
            redirect('/forgot-password?message= could not authenticate user')
        }
        redirect(`/confirm?message=reset link has been sent to your email address (${email}) if it is registered`)
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
                <form action={confirmReset} className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mb-4">
                    <label className="text-md" htmlFor="email">
                        Enter Email Address
                    </label>
                    <input
                        className="rounded-md px-4 py-2 bg-inherit border mb-6"
                        name="email"
                        placeholder=""
                        required
                    />

                    <button className="text-secondary bg-primary rounded-md px-4 py-2  mb-2">
                        Confirm
                    </button>

                    {searchParams?.message && (
                        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                            {searchParams.message}
                        </p>
                    )}
                </form>

                <Link
                    href="/signin"
                    className="rounded-md no-underline text-foreground text-sm"
                >
                    Remember your password? Sign in
                </Link>
            </div>
        </div>
    );
}
