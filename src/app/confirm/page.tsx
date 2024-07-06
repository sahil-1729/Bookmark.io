import Header from '@/components/Header(login-signup)/Header';

export default function Signup({
    searchParams,
}: {
    searchParams: { message: string };
}) {
    return (
        <div>
            <Header />

            <div className="w-full px-8 sm:max-w-lg mx-auto mt-8 bg-black rounded-lg border-2 border-primary p-8">
                <p className="text-foreground">{searchParams.message}</p>
            </div>
        </div>
    );
}
