import { createClient } from "https://esm.sh/@supabase/supabase-js";
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;

const supabase = createClient(supabaseUrl, supabaseKey);

Deno.serve(async (req) => {
  const shortId = new URL(req.url).pathname.split("/").pop();

  if (!shortId) {
    return new Response("Missing short_id", { status: 400 });
  }

  const { data, error } = await supabase
    .from("urls")
    .select("original_url")
    .eq("short_id", shortId)
    .single();

  if (error || !data) {
    return new Response("Short URL not found", { status: 404 });
  }

  return Response.redirect(data.original_url, 302);
});
