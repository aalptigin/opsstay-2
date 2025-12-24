"use client";

import { useState } from "react";

export default function RecordAddPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [riskLevel, setRiskLevel] = useState<"Bilgi" | "Dikkat" | "Kritik">("Bilgi");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function submit() {
    setLoading(true);
    setMsg(null);
    try {
      const r = await fetch("/api/gs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "record.add",
          data: { fullName, phone, riskLevel, note },
        }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || "Kayıt eklenemedi");
      setMsg("✅ Kayıt eklendi.");
      setFullName(""); setPhone(""); setNote(""); setRiskLevel("Bilgi");
    } catch (e: any) {
      setMsg("❌ " + e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 text-white">
      <h1 className="text-3xl font-extrabold">Kayıt ekle</h1>
      <p className="mt-2 text-white/70">Records tab’ına yeni kayıt ekler.</p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <label className="text-sm text-white/70">Misafir ad soyad</label>
        <input className="mt-2 w-full rounded-xl bg-black/30 px-4 py-3 outline-none ring-1 ring-white/10"
          value={fullName} onChange={(e)=>setFullName(e.target.value)} placeholder="Örn: Ad Soyad" />

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-white/70">Telefon</label>
            <input className="mt-2 w-full rounded-xl bg-black/30 px-4 py-3 outline-none ring-1 ring-white/10"
              value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="05xx..." />
          </div>

          <div>
            <label className="text-sm text-white/70">Risk seviyesi</label>
            <select className="mt-2 w-full rounded-xl bg-black/30 px-4 py-3 outline-none ring-1 ring-white/10"
              value={riskLevel} onChange={(e)=>setRiskLevel(e.target.value as any)}>
              <option>Bilgi</option>
              <option>Dikkat</option>
              <option>Kritik</option>
            </select>
          </div>
        </div>

        <label className="mt-4 block text-sm text-white/70">Not</label>
        <textarea className="mt-2 h-32 w-full resize-none rounded-xl bg-black/30 px-4 py-3 outline-none ring-1 ring-white/10"
          value={note} onChange={(e)=>setNote(e.target.value)} placeholder="Kısa not..." />

        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm">{msg}</div>
          <button
            onClick={submit}
            disabled={loading || !fullName.trim()}
            className="rounded-full bg-[#0EA5FF] px-6 py-3 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Ekleniyor..." : "Kayıt ekle"}
          </button>
        </div>
      </div>
    </div>
  );
}
