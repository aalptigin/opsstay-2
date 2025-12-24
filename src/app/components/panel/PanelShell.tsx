"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, ClipboardCheck, PlusSquare, Trash2, Pencil, Search, Inbox } from "lucide-react";

type Me = { username: string; name: string; role: string; restaurant: string };

export default function PanelShell({ children }: { children: React.ReactNode }) {
  const [openKayit, setOpenKayit] = useState(true);
  const [me, setMe] = useState<Me | null>(null);

  useEffect(() => {
    fetch("/api/auth/me").then(r => r.json()).then(d => setMe(d.user)).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-[1400px]">
        <aside className="w-[280px] border-r border-white/10 bg-gradient-to-b from-slate-950 to-slate-900">
          <div className="px-5 py-5">
            <div className="text-xs tracking-[0.25em] text-sky-400/80">OPSSTAY PANEL</div>
            <div className="mt-1 text-sm text-slate-300">Misafir ön kontrol alanı</div>
          </div>

          <nav className="px-3 py-2">
            <Link className="navItem" href="/panel/rezervasyon">
              <ClipboardCheck className="h-4 w-4" /> Rezervasyon
            </Link>

            <button className="navItem w-full justify-between" onClick={() => setOpenKayit(v => !v)}>
              <span className="flex items-center gap-2">
                <ChevronDown className={`h-4 w-4 transition ${openKayit ? "rotate-0" : "-rotate-90"}`} />
                Kayıt
              </span>
              <span className="text-xs text-slate-400">4</span>
            </button>

            {openKayit && (
              <div className="ml-3 mt-1 space-y-1 border-l border-white/10 pl-3">
                <Link className="subItem" href="/panel/kayit/ekle"><PlusSquare className="h-4 w-4" /> Kayıt ekle</Link>
                <Link className="subItem" href="/panel/kayit/sil"><Trash2 className="h-4 w-4" /> Kayıt sil</Link>
                <Link className="subItem" href="/panel/kayit/duzenle"><Pencil className="h-4 w-4" /> Kayıt düzenle</Link>
                <Link className="subItem" href="/panel/kayit/kontrol"><Search className="h-4 w-4" /> Kontrol</Link>
              </div>
            )}

            <Link className="navItem mt-2" href="/panel/talepler">
              <Inbox className="h-4 w-4" /> Talepler
            </Link>
          </nav>

          <div className="mt-auto px-5 pb-5 pt-6">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="text-xs text-slate-300">
                <div className="font-medium text-sky-300">{me?.role ?? "Yetkili Kullanıcı"}</div>
                <div className="text-slate-400">{me?.restaurant ?? "—"}</div>
              </div>
              <div className="mt-2 border-t border-white/10 pt-2 text-sm font-semibold">
                {me?.name ?? "—"}
              </div>

              <button
                className="mt-3 w-full rounded-lg bg-slate-800 px-3 py-2 text-sm hover:bg-slate-700"
                onClick={async () => { await fetch("/api/auth/logout", { method: "POST" }); location.href = "/"; }}
              >
                Çıkış yap
              </button>
            </div>

            <div className="mt-3 text-[11px] text-slate-500">
              Bu panel yalnızca yetkili kullanıcılar içindir.
            </div>
          </div>
        </aside>

        <main className="flex-1 px-8 py-8">{children}</main>
      </div>

      <style jsx global>{`
        .navItem{
          display:flex; align-items:center; gap:10px;
          padding:10px 12px; border-radius:12px;
          color:#cbd5e1; background:transparent;
        }
        .navItem:hover{ background:rgba(255,255,255,0.06); }
        .subItem{
          display:flex; align-items:center; gap:10px;
          padding:8px 10px; border-radius:10px;
          color:#cbd5e1;
        }
        .subItem:hover{ background:rgba(255,255,255,0.06); }
      `}</style>
    </div>
  );
}
