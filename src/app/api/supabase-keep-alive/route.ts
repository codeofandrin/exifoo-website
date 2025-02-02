import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL as string
const supabaseKey = process.env.SUPABASE_KEY as string
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
    try {
        let error
        const respKeepAlive = await supabase.from("keep-alive").select()
        error = respKeepAlive.error
        if (error) throw new Error(error.message)

        const respExistsMachineId = await supabase.rpc("exists_machine_id", { mid_input: "foo" })
        error = respExistsMachineId.error
        return Response.json({ message: "Successful" })
    } catch (error) {
        const message = (error as Error).message ?? "An error occurred."
        return Response.json({ error: message }, { status: 400 })
    }
}
