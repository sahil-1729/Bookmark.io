import Header from '@/components/Header(login-signup)/Header';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function ResetPassword({
    searchParams,
}: {
    searchParams: { message: string, code: string };
}) {
    const resetPassword = async (formData: FormData) => {
        'use server'
        const password = formData.get('password') as string
        const supabase = createClient()

        // console.log('reset password ', searchParams, searchParams.code)
        if (searchParams.code) {
            const supabase = createClient()
            const { error } = await supabase.auth.exchangeCodeForSession(searchParams.code)
            if (error) {
                return redirect('/reset-password?message=unable to reset password, link expired')
            }
        }

        const { error } = await supabase.auth.updateUser({
            password: password
        })
        console.log(error)

        if (error) {
            return redirect('/reset-password?message=password is the same or unknown error')
        }

        await supabase.auth.signOut()
        return redirect('/reset-password?message=password has been reset bro, sign in')


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
                <form action={resetPassword} className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mb-4">
                    <label className="text-md" htmlFor="password">
                        New Password
                    </label>
                    <input
                        className="rounded-md px-4 py-2 bg-inherit border mb-6"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                    />
                    <label className="text-md" htmlFor="password">
                        Confirm New Password
                    </label>
                    <input
                        className="rounded-md px-4 py-2 bg-inherit border mb-6"
                        type="password"
                        name="confirmPassword"
                        placeholder="••••••••"
                        required
                    />
                    <button className="text-secondary bg-primary rounded-md px-4 py-2  mb-2">
                        Reset
                    </button>

                    {searchParams?.message && (
                        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                            {searchParams.message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
