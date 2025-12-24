"use client";
import { useState } from "react";

export default function RezervasyonPage() {
  const [datetime, setDatetime] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-semibold">Rezervasyon</h1>
      <p className="mt-2 text-slate-400">Gün/Ay/Yıl saat, isim soyisim, telefon ve not.</p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="grid gap-4">
          <input className="inp" placeholder="Gün/Ay/Yıl Saat (örn: 24.12.2025 19:30)" value={datetime} onChange={e=>setDatetime(e.target.value)} />
          <input className="inp" placeholder="İsim Soyisim" value={fullName} onChange={e=>setFullName(e.target.value)} />
          <input className="inp" placeholder="Telefon" value={phone} onChange={e=>setPhone(e.target.value)} />
          <textarea className="inp min-h-[120px]" placeholder="Not" value={note} onChange={e=>setNote(e.target.value)} />

          <button
            className="rounded-xl bg-sky-500 px-4 py-3 font-semibold text-slate-950 hover:bg-sky-400"
            onClick={async ()=>{
              setMsg(null);
              const r = await fetch("/api/gs", {
                method:"POST",
                headers:{ "Content-Type":"application/json" },
                body: JSON.stringify({
                  action:"reservation.create",
                  data:{ datetime, fullName, phone, note, restaurant:"Opsstay Hotel Taksim", createdBy:"panel" }
                })
              });
              const j = await r.json();
              setMsg(j.ok ? "Rezervasyon kaydedildi ✅" : ("Hata: " + (j.error || "—")));
            }}
          >
            Kaydet
          </button>

          {msg && <div className="text-sm text-slate-300">{msg}</div>}
        </div>
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
