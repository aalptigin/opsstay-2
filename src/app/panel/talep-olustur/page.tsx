"use client";
import { useState } from "react";

export default function TalepOlusturPage() {
  const [fullName, setFullName] = useState("");
  const [hotel, setHotel] = useState("Opsstay Hotel Taksim");
  const [department, setDepartment] = useState("Ön Büro");
  const [riskLevel, setRiskLevel] = useState<"Bilgi" | "Dikkat" | "Kritik">("Bilgi");
  const [summary, setSummary] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  async function submit() {
    setMsg(null);
    const r = await fetch("/api/gs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "request.create",
        data: { fullName, hotel, department, riskLevel, summary }
      })
    });
    const j = await r.json();
    setMsg(j.ok ? `Talep oluşturuldu ✅ (id: ${j.id})` : `Hata: ${j.error || "—"}`);
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-semibold">Yeni risk talebi oluştur</h1>
      <p className="mt-2 text-slate-400">Talebiniz yalnızca yetkili operasyon ve müdür tarafından görülür.</p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="grid gap-4">
          <input className="inp" placeholder="Misafir adı soyadı" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <input className="inp" placeholder="Otel" value={hotel} onChange={(e) => setHotel(e.target.value)} />
            <input className="inp" placeholder="Departman" value={department} onChange={(e) => setDepartment(e.target.value)} />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {(["Bilgi", "Dikkat", "Kritik"] as const).map((x) => (
              <button key={x} className={`cardBtn ${riskLevel === x ? "cardBtnActive" : ""}`} onClick={() => setRiskLevel(x)}>
                <div className="font-semibold">{x}</div>
              </button>
            ))}
          </div>

          <textarea className="inp min-h-[160px]" placeholder="Durumun özeti" value={summary} onChange={(e) => setSummary(e.target.value)} />

          <button className="rounded-xl bg-sky-500 px-4 py-3 font-semibold text-slate-950 hover:bg-sky-400" onClick={submit}>
            Talep oluştur
          </button>

          {msg && <div className="text-sm text-slate-300">{msg}</div>}
        </div>
      </div>

      <style jsx global>{`
        .inp {
          width: 100%;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(2, 6, 23, 0.6);
          padding: 12px 14px;
          color: #e2e8f0;
          outline: none;
        }
        .inp:focus {
          border-color: rgba(56, 189, 248, 0.6);
        }
        .cardBtn {
          text-align: left;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(0, 0, 0, 0.18);
          padding: 14px;
          transition: 160ms;
        }
        .cardBtn:hover {
          background: rgba(255, 255, 255, 0.06);
        }
        .cardBtnActive {
          border-color: rgba(56, 189, 248, 0.7);
          background: rgba(56, 189, 248, 0.12);
        }
      `}</style>
    </div>
  );
}
