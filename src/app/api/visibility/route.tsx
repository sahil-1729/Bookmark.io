
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

async function changeVisibility(user_id: string, category: string, is_public: boolean) {
    const supabase = createClient();
    const { data: user } = await supabase.auth.getUser()
    // console.log(user.user?.id)

    const { data, error } = await supabase
        .from('uq_category_bookmarks')
        .update({ is_public: is_public })
        .eq('user_id', user_id)
        .eq('categories', category)
        .select()


    console.log(data, "error ", error)

    if (error) {
        console.log(error)
        throw error
    };
    return "success"
}

export async function POST(req: Request) {
    try {
        const { user_id, is_public, category } = await req.json();

        const response = await changeVisibility(user_id, category, is_public);

        return NextResponse.json({
            data: response,
            message: 'success'
        }, { status: 200 })



    } catch (error) {
        console.log("Error generating response: " + error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 404 })
    }
}