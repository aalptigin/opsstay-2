"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return email.trim().length > 4 && password.trim().length > 3 && !loading;
  }, [email, password, loading]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErr(data?.error || "Giriş başarısız. Bilgileri kontrol edin.");
        return;
      }

      router.replace("/panel");
    } catch {
      setErr("Ağ hatası. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen w-full bg-[#050B1A]">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_10%,rgba(0,180,255,0.18),transparent_60%),radial-gradient(900px_600px_at_90%_20%,rgba(120,90,255,0.16),transparent_55%),radial-gradient(900px_700px_at_50%_90%,rgba(0,255,200,0.08),transparent_55%)]" />
        {/* Image layer */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: "url(/landing/hero.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(2px)",
            transform: "scale(1.03)",
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050B1A]/70 via-[#050B1A]/85 to-[#050B1A]" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-4 py-10">
        <div className="w-full">
          <section className="mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl">
            {/* Top: Login card */}
            <div className="grid gap-8 p-8 md:grid-cols-[1.1fr_0.9fr] md:p-10">
              {/* Left: Brand + copy */}
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-cyan-500/15 ring-1 ring-cyan-400/25">
                    <span className="text-lg font-semibold text-cyan-200">O</span>
                  </div>
                  <div>
                    <div className="text-base font-semibold text-white">opsstay</div>
                    <div className="text-xs text-white/60">
                      Misafir Ön Kontrol & Güvenli Konaklama
                    </div>
                  </div>
                </div>

                <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  Check paneline giriş yapın
                </h1>
                <p className="max-w-xl text-sm leading-6 text-white/70">
                  Bu alan sadece yetkilendirilmiş kullanıcılar içindir. Misafir ön kontrol
                  sonuçları, operasyon notları ve yönetim raporlarına buradan erişirsiniz.
                </p>

                <div className="hidden md:block">
                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="text-xs font-semibold text-white/70">
                      Güvenlik notu
                    </div>
                    <div className="mt-1 text-xs leading-5 text-white/60">
                      Oturum, güvenli cookie ile tutulur. Kişisel veriler ekranda
                      gösterilmez; yalnızca operasyon için gerekli özet görünür.
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Form */}
              <div className="rounded-2xl border border-white/10 bg-[#070F25]/60 p-5 md:p-6">
                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <label className="mb-2 block text-xs font-medium text-white/70">
                      Kurumsal e-posta
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ornek@isletmeniz.com"
                      className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/15"
                      autoComplete="email"
                      inputMode="email"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium text-white/70">
                      Şifre
                    </label>
                    <div className="relative">
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPw ? "text" : "password"}
                        placeholder="••••••••"
                        className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 pr-12 text-sm text-white outline-none placeholder:text-white/35 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/15"
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw((v) => !v)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-3 py-2 text-xs text-white/60 hover:bg-white/5 hover:text-white"
                      >
                        {showPw ? "Gizle" : "Göster"}
                      </button>
                    </div>
                  </div>

                  {err ? (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-100">
                      {err}
                    </div>
                  ) : null}

                  <button
                    disabled={!canSubmit}
                    className="h-11 w-full rounded-xl bg-cyan-500 text-sm font-semibold text-[#03101B] shadow-[0_10px_30px_rgba(0,180,255,0.25)] transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
                  </button>

                  <div className="pt-2 text-[11px] leading-5 text-white/45">
                    Bu panele giriş yaparak, yalnızca görev tanımınız kapsamında sisteme erişmeyi
                    kabul etmiş olursunuz.
                  </div>
                </form>
              </div>
            </div>

            {/* Bottom: Marketing strip (ekrandaki gibi) */}
            <div className="relative overflow-hidden border-t border-white/10">
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage: "url(/landing/hero.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050B1A]/95 via-[#050B1A]/85 to-[#050B1A]/95" />

              <div className="relative grid gap-6 p-8 md:grid-cols-2 md:items-center md:p-10">
                <div>
                  <div className="text-[11px] font-semibold tracking-[0.2em] text-cyan-200/70">
                    OPERASYON EKİBİ İÇİN TASARLANDI
                  </div>
                  <h2 className="mt-2 text-xl font-semibold text-white md:text-2xl">
                    Tek ekranda operasyonel ön kontrol süreci.
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    Opsstay; farklı kaynaklardan gelen notları tek bir çerçevede birleştirir.
                    Karar otel/işletme yönetimindedir, sistem sadece destekleyici özet üretir.
                  </p>
                </div>

                <ul className="space-y-3 text-sm text-white/70">
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400/90" />
                    Anlık ön kontrol sonuçları ve özet görünür.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400/90" />
                    KVKK prensiplerine uygun, sadeleştirilmiş bilgi akışı.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-amber-300/90" />
                    Departmanlar arası tutarlı dil ve kayıt yönetimi.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Mobile spacing */}
          <div className="mt-6 text-center text-xs text-white/35">
            © {new Date().getFullYear()} Opsstay. Tüm hakları saklıdır.
          </div>
        </div>
      </div>
    </main>
  );
}
