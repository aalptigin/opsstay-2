"use client";

import { useEffect, useMemo, useState } from "react";

type Req = {
  id: string;
  fullName: string;
  hotel: string;
  department: string;
  riskLevel: "Bilgi" | "Dikkat" | "Kritik";
  summary: string;
  status: "open" | "approved" | "rejected";
  managerNote?: string;
  createdAt: string;
};

export default function RequestsPage() {
  const [items, setItems] = useState<Req[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);

  const openItems = useMemo(() => items.filter(i => i.status === "open"), [items]);

  async function load() {
    setLoading(true);
    setMsg(null);
    try {
      const r = await fetch("/api/gs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "request.list", data: {} }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || "Liste alınamadı");
      setItems(j.items || []);
    } catch (e: any) {
      setMsg("❌ " + e.message);
    } finally {
      setLoading(false);
    }
  }

  async function respond(id: string, decision: "approved" | "rejected", managerNote: string) {
    setMsg(null);
    try {
      const r = await fetch("/api/gs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "request.respond", data: { id, decision, managerNote } }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || "Yanıtlanamadı");
      setMsg("✅ Yanıt kaydedildi.");
      await load();
    } catch (e: any) {
      setMsg("❌ " + e.message);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Talepler</h1>
          <p className="mt-2 text-white/70">
            Müdür yanıtı gerektiren taleplerin listesi (Requests tabı).
          </p>
        </div>
        <button
          onClick={load}
          className="rounded-full bg-white/10 px-5 py-2 text-sm font-semibold hover:bg-white/15"
        >
          Yenile
        </button>
      </div>

      {msg && <div className="mt-4 text-sm">{msg}</div>}

      <div className="mt-8 grid gap-4">
        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">Yükleniyor...</div>
        ) : openItems.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">Açık talep yok.</div>
        ) : (
          openItems.map((it) => (
            <RequestCard key={it.id} it={it} onRespond={respond} />
          ))
        )}
      </div>
    </div>
  );
}

function RequestCard({ it, onRespond }: { it: Req; onRespond: (id: string, d: any, note: string) => Promise<void> }) {
  const [note, setNote] = useState("");
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="font-semibold">
          {it.fullName} • <span className="text-white/70">{it.hotel} / {it.department}</span>
        </div>
        <div className="rounded-full bg-black/30 px-3 py-1 text-xs font-semibold ring-1 ring-white/10">
          {it.riskLevel.toUpperCase()}
        </div>
      </div>

      <div className="mt-3 text-sm text-white/80">{it.summary}</div>
      <div className="mt-2 text-xs text-white/50">Oluşturma: {it.createdAt}</div>

      <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <input
          className="w-full rounded-xl bg-black/30 px-4 py-3 outline-none ring-1 ring-white/10"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Müdür notu (opsiyonel)"
        />
        <button
          onClick={() => onRespond(it.id, "approved", note)}
          className="rounded-full bg-[#0EA5FF] px-5 py-3 text-sm font-semibold text-white"
        >
          Onayla
        </button>
        <button
          onClick={() => onRespond(it.id, "rejected", note)}
          className="rounded-full bg-white/10 px-5 py-3 text-sm font-semibold hover:bg-white/15"
        >
          Reddet
        </button>
      </div>
    </div>
  );
}
