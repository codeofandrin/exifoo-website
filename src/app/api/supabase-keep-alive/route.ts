import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL as string
const supabaseKey = process.env.SUPABASE_KEY as string
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
    try {
        const { data, error } = await supabase.from("keep-alive").select()
        if (error) throw new Error(error.message)
        return Response.json(data)
    } catch (error) {
        const message = (error as Error).message ?? "An error occurred."
        return Response.json({ error: message }, { status: 400 })
    }
}
