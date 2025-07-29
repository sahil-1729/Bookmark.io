
import Link from 'next/link';

export const AuthButtons = async () => {

  return (
    <div className="mt-10 flex items-center justify-center gap-x-6">
      <Link
        href="/login"
        className="rounded-md border-white border bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold shadow-sm hover:bg-popover hover:text-popover-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground"
      >
        Login
      </Link>
      <Link
        href="/signup"
        className="rounded-md border-white border bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold shadow-sm hover:bg-popover hover:text-popover-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground"
      >
        Signup
      </Link>
    </div>
  );
};
