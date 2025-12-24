"use client";

import { useState } from "react";

export default function RecordUpdatePage() {
  const [query, setQuery] = useState("");
  const [patch, setPatch] = useState({ fullName: "", phone: "", riskLevel: "", note: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function submit() {
    setLoading(true);
    setMsg(null);
    try {
      const r = await fetch("/api/gs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "record.update", data: { query, patch } }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || "Güncellenemedi");
      setMsg(`✅ Güncellendi. (${j.updatedCount} kayıt)`);
      setQuery("");
      setPatch({ fullName: "", phone: "", riskLevel: "", note: "" });
    } catch (e: any) {
      setMsg("❌ " + e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 text-white">
      <h1 className="text-3xl font-extrabold">Kayıt düzenle</h1>
      <p className="mt-2 text-white/70">Query ile kayıt bulur, patch alanlarını günceller.</p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <label className="text-sm text-white/70">Hangi kayıt?</label>
        <input
          className="mt-2 w-full rounded-xl bg-black/30 px-4 py-3 outline-none ring-1 ring-white/10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Örn: Ad Soyad veya 05xx..."
        />

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Field label="Yeni Ad Soyad" value={patch.fullName} onChange={(v)=>setPatch(p=>({...p, fullName:v}))} />
          <Field label="Yeni Telefon" value={patch.phone} onChange={(v)=>setPatch(p=>({...p, phone:v}))} />
          <Field label="Yeni Risk (Bilgi/Dikkat/Kritik)" value={patch.riskLevel} onChange={(v)=>setPatch(p=>({...p, riskLevel:v}))} />
          <Field label="Yeni Not" value={patch.note} onChange={(v)=>setPatch(p=>({...p, note:v}))} />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm">{msg}</div>
          <button
            onClick={submit}
            disabled={loading || !query.trim()}
            className="rounded-full bg-[#0EA5FF] px-6 py-3 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Güncelleniyor..." : "Güncelle"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-sm text-white/70">{label}</label>
      <input
        className="mt-2 w-full rounded-xl bg-black/30 px-4 py-3 outline-none ring-1 ring-white/10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Boş bırakılırsa değişmez"
      />
    </div>
  );
}
