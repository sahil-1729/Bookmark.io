'use server'
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
export async function GetUserName() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  // console.log(session)

  // if (session && user) {
  //   return undefined
  // }
  if (user) {
    const index = user.email.indexOf('@');
    const name = user.email.slice(0, index);
    return name;
  }
  return ""
}

export default async function User() {

  const signOut = async () => {
    'use server'
    const supabase = createClient()
    await supabase.auth.signOut()
    redirect('/login')
  }

  const name = await GetUserName()

  return (
    name && (<div className="flex items-center gap-4">
      {name === "" ? "" : `Hey, ${name}`}
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>)
  );
}
