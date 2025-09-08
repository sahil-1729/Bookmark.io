
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import crypto from "crypto";

// Fetch relevant chunks of information using the embedding generated embedding
function generateShareToken() {
    return crypto.randomBytes(16).toString("hex");
}

async function getToken(user_id: string, category: string) {
    const supabase = createClient();
    const { data: user } = await supabase.auth.getUser()
    // console.log(user.user?.id)

    const access_token = generateShareToken()

    const { data, error } = await supabase
        .from('uq_category_bookmarks')
        .select('*')
        .eq('user_id', user_id)
        .eq('categories', category)

    // console.log(data)

    if (error) {
        console.log(error)
        throw error
    };

    if (data != undefined && data?.length > 0) {
        return {
            token: data[0]?.access_token,
            isPublic: data[0]?.is_public
        }
    } else {
        const { data, error } = await supabase
            .from('uq_category_bookmarks')
            .insert({
                user_id: user_id,
                categories: category,
                access_token: access_token,
                is_public: false
            }, { count: 'planned' })
            .select()

        if (error) {
            console.log(error)
            throw error
        }

        // console.log(data)
        return { token: data[0]?.access_token, isPublic: data[0]?.is_public }

    }

}

export async function POST(req: Request) {
    try {
        const { user_id, is_public, category } = await req.json();

        const response = await getToken(user_id, category);

        return NextResponse.json({
            data: response,
            message: 'success'
        }, { status: 200 })



    } catch (error) {
        console.log("Error generating response: " + error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 404 })
    }
}