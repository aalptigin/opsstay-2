"use client";
import { useState } from "react";

export default function KayitKontrol() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-semibold">Misafir ön kontrol sorgusu</h1>
      <p className="mt-2 text-slate-400">Ad soyad ile kontrol edin (aktif kayıtlar içinde).</p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <input className="inp" placeholder="Örn: Ad Soyad" value={q} onChange={e=>setQ(e.target.value)} />
        <button
          className="mt-4 w-full rounded-xl bg-sky-500 px-4 py-3 font-semibold text-slate-950 hover:bg-sky-400"
          onClick={async ()=>{
            setMsg(null);
            const r = await fetch("/api/gs", {
              method:"POST",
              headers:{ "Content-Type":"application/json" },
              body: JSON.stringify({ action:"record.check", data:{ query:q } })
            });
            const j = await r.json();
            if (!j.ok) { setMsg("Hata: " + (j.error || "—")); setItems([]); return; }
            setItems(j.matches || []);
            setMsg((j.matches||[]).length ? null : "Eşleşme bulunamadı.");
          }}
        >
          Check et
        </button>

        {msg && <div className="mt-4 text-sm text-slate-300">{msg}</div>}

        {items.length > 0 && (
          <div className="mt-5 space-y-3">
            {items.map((x) => (
              <div key={x.id} className="rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="font-semibold">{x.fullName}</div>
                <div className="text-sm text-slate-300">Seviye: <span className="text-sky-300">{x.level}</span></div>
                <div className="mt-1 text-sm text-slate-400">{x.note}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx global>{`
        .inp{
          width:100%;
          border-radius:14px;
          border:1px solid rgba(255,255,255,0.12);
          background:rgba(2,6,23,0.6);
          padding:12px 14px;
          color:#e2e8f0;
          outline:none;
        }
        .inp:focus{ border-color: rgba(56,189,248,0.6); }
      `}</style>
    </div>
  );
}
