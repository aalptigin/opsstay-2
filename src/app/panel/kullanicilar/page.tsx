"use client";

import { useEffect, useState } from "react";

type U = {
  username: string; // email
  name: string;
  role: string;
  restaurant: string;
  active: boolean;
};

export default function KullanicilarPage() {
  const [users, setUsers] = useState<U[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/gs", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "user.list" }),
    });
    const json = await res.json();
    setUsers(json.users || []);
    setLoading(false);
  }

  async function del(username: string) {
    if (!confirm(`${username} silinsin mi?`)) return;
    await fetch("/api/gs", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "user.delete", payload: { username } }),
    });
    await load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 22, fontWeight: 800 }}>Kullanıcılar</h1>
      <p style={{ opacity: 0.8, marginTop: 6 }}>
        Bu ekran sadece Admin içindir. (username = e-posta)
      </p>

      {loading ? (
        <div style={{ marginTop: 16 }}>Yükleniyor…</div>
      ) : (
        <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
          {users.map((u) => (
            <div
              key={u.username}
              style={{
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 12,
                padding: 12,
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div>
                <div style={{ fontWeight: 800 }}>{u.username}</div>
                <div style={{ opacity: 0.8, fontSize: 13 }}>
                  {u.name} • {u.role} • {u.restaurant} • {u.active ? "active" : "inactive"}
                </div>
              </div>
              <button
                onClick={() => del(u.username)}
                style={{
                  padding: "8px 12px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,0,80,0.12)",
                  cursor: "pointer",
                }}
              >
                Sil
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
