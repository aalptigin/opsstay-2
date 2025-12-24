import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import { listUsers, deleteUserByUsername } from "@/lib/gs-users";

async function requireAdmin() {
  const token = cookies().get("opssstay_session")?.value;
  const sess = token ? await verifySession(token) : null;
  if (!sess) return null;
  // sess içinde role yoksa, verifySession payload'ına role ekli olmalı
  if (sess.role !== "Admin") return null;
  return sess;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.action) return NextResponse.json({ ok: false, error: "Missing action" }, { status: 400 });

  const { action, payload } = body;

  // User yönetimi sadece Admin
  if (action.startsWith("user.")) {
    const admin = await requireAdmin();
    if (!admin) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    if (action === "user.list") {
      const rows = await listUsers();
      return NextResponse.json({ ok: true, users: rows });
    }

    if (action === "user.delete") {
      const username = String(payload?.username || "").trim(); // burada username = email
      if (!username) return NextResponse.json({ ok: false, error: "Missing username" }, { status: 400 });
      await deleteUserByUsername(username);
      return NextResponse.json({ ok: true });
    }
  }

  return NextResponse.json({ ok: false, error: "Unknown action" }, { status: 400 });
}
