"use client";

import { useState } from "react";

export default function RecordDeletePage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function submit() {
    setLoading(true);
    setMsg(null);
    try {
      const r = await fetch("/api/gs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "record.delete", data: { query } }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || "Silinemedi");
      setMsg(`✅ Silindi. (${j.deletedCount} kayıt)`);
      setQuery("");
    } catch (e: any) {
      setMsg("❌ " + e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 text-white">
      <h1 className="text-3xl font-extrabold">Kayıt sil</h1>
      <p className="mt-2 text-white/70">Ad soyad veya telefon ile kayıt siler.</p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <label className="text-sm text-white/70">Sorgu</label>
        <input
          className="mt-2 w-full rounded-xl bg-black/30 px-4 py-3 outline-none ring-1 ring-white/10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Örn: Ad Soyad veya 05xx..."
        />

        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm">{msg}</div>
          <button
            onClick={submit}
            disabled={loading || !query.trim()}
            className="rounded-full bg-[#0EA5FF] px-6 py-3 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Siliniyor..." : "Kayıt sil"}
          </button>
        </div>
      </div>
    </div>
  );
}
