"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/SupabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { customAlphabet } from "nanoid";

export default function UrlShortener() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShortUrl(null);

    const sessionId = localStorage.getItem("session_id") || crypto.randomUUID();
    localStorage.setItem("session_id", sessionId);

    const nanoid = customAlphabet(
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
      8
    );

    const short_id = nanoid();

    const { data, error } = await supabase
      .from("urls")
      .insert({
        original_url: originalUrl,
        short_id,
        session_id: sessionId,
      })
      .select()
      .single();

    if (error) {
      setError(error.message);
    } else {
      const baseUrl = import.meta.env.VITE_BASE_URL;
      setShortUrl(`${baseUrl}/${data.short_id}`);
      setOriginalUrl("");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg w-full">
      <Input
        type="url"
        placeholder="Enter a URL to shorten"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading || !originalUrl}>
        {loading ? "Shortening..." : "Shorten URL"}
      </Button>
      {shortUrl && (
        <div className="bg-green-100 p-2 rounded text-center">
          <a
            href={shortUrl}
            className="underline text-primary"
            target="_blank"
            rel="noreferrer"
          >
            {shortUrl}
          </a>
        </div>
      )}
      {error && <div className="text-red-600">{error}</div>}
    </form>
  );
}
