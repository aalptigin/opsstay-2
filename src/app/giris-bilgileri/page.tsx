import Link from "next/link";
import { notFound } from "next/navigation";

export default function GirisBilgileriPage() {
  // Prod’da kapalı kalsın istiyorsan env ile aç/kapa:
  // .env.local -> SHOW_LOGIN_INFO=true
  if (process.env.SHOW_LOGIN_INFO !== "true") notFound();

  const password = "123456.a";
  const users = [
    { username: "admin", role: "Admin (her şeyi görür + talepler)" },
    { username: "rezervasyon", role: "Rezervasyon" },
    { username: "guvenlik", role: "Güvenlik" },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "48px 16px",
        background:
          "radial-gradient(1200px 600px at 20% 10%, rgba(0,140,255,0.18), transparent 60%), radial-gradient(900px 500px at 80% 20%, rgba(0,255,190,0.12), transparent 55%), #070B14",
        color: "#EAF2FF",
      }}
    >
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <div
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)",
            borderRadius: 18,
            padding: 24,
            boxShadow: "0 18px 60px rgba(0,0,0,0.45)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 12, letterSpacing: 2, opacity: 0.8 }}>OPSSTAY PANEL</div>
              <h1 style={{ margin: "10px 0 6px", fontSize: 34, lineHeight: 1.15 }}>
                Giriş bilgileri
              </h1>
              <p style={{ margin: 0, opacity: 0.8 }}>
                Bu sayfa sadece senin için. İşin bitince kapatmayı unutma.
              </p>
            </div>

            <Link
              href="/login"
              style={{
                alignSelf: "center",
                padding: "10px 14px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.06)",
                color: "#EAF2FF",
                textDecoration: "none",
              }}
            >
              Login sayfasına git →
            </Link>
          </div>

          <div
            style={{
              marginTop: 18,
              padding: 16,
              borderRadius: 14,
              border: "1px solid rgba(0,140,255,0.25)",
              background: "rgba(0,140,255,0.08)",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Şifre (tüm kullanıcılar)</div>
            <code
              style={{
                display: "inline-block",
                padding: "10px 12px",
                borderRadius: 10,
                background: "rgba(0,0,0,0.35)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {password}
            </code>
          </div>

          <div style={{ marginTop: 18 }}>
            <div style={{ fontWeight: 700, marginBottom: 10 }}>Kullanıcılar</div>
            <div style={{ display: "grid", gap: 12 }}>
              {users.map((u) => (
                <div
                  key={u.username}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    alignItems: "center",
                    padding: 14,
                    borderRadius: 14,
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 12, opacity: 0.7 }}>Kullanıcı adı</div>
                    <div style={{ fontSize: 18, fontWeight: 700 }}>{u.username}</div>
                    <div style={{ fontSize: 13, opacity: 0.8, marginTop: 2 }}>{u.role}</div>
                  </div>

                  <code
                    style={{
                      padding: "8px 10px",
                      borderRadius: 10,
                      background: "rgba(0,0,0,0.35)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {password}
                  </code>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 18, fontSize: 12, opacity: 0.65 }}>
            Kapatmak için: Cloudflare Pages env’den <b>SHOW_LOGIN_INFO</b> değişkenini sil veya <b>false</b> yap.
          </div>
        </div>
      </div>
    </main>
  );
}
