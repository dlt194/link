import { useEffect, useState } from "react";
import { supabase } from "@/lib/SupabaseClient";
import { Button } from "@/components/ui/button";

type UrlRow = {
  id: string;
  original_url: string;
  short_id: string;
  created_at: string;
};

export default function UrlList() {
  const [urls, setUrls] = useState<UrlRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUrls = async (sessionId: string) => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("urls")
      .select("id, original_url, short_id, created_at")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setUrls(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    const sessionId = localStorage.getItem("session_id");
    if (!sessionId) {
      setUrls([]);
      setLoading(false);
      return;
    }

    fetchUrls(sessionId);

    const channel = supabase
      .channel("urls-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "urls",
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setUrls((prev) => [payload.new as UrlRow, ...prev]);
          } else if (payload.eventType === "DELETE") {
            setUrls((prev) =>
              prev.filter((u) => u.id !== (payload.old as UrlRow).id)
            );
          } else if (payload.eventType === "UPDATE") {
            setUrls((prev) =>
              prev.map((u) =>
                u.id === (payload.new as UrlRow).id
                  ? (payload.new as UrlRow)
                  : u
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold mb-2">Your Shortened URLs</h2>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && urls.length === 0 && <div>No URLs yet.</div>}

      <ul className="space-y-1">
        {urls.map((url) => {
          const shortLink = `${import.meta.env.VITE_BASE_URL}/${url.short_id}`;
          return (
            <li
              key={url.id}
              className="p-2 border rounded flex items-center justify-between"
            >
              <div className="text-sm break-words">
                <a
                  href={shortLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline"
                >
                  {shortLink}
                </a>
                <div className="text-gray-500">{url.original_url}</div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={async () => {
                  const { error } = await supabase
                    .from("urls")
                    .delete()
                    .eq("id", url.id);
                  if (!error) {
                    // Remove from local state immediately
                    setUrls((prev) => prev.filter((u) => u.id !== url.id));
                  } else {
                    console.error("Delete failed", error.message);
                  }
                }}
              >
                Delete
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
