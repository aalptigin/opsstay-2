import { NextResponse } from "next/server";
import { getUserByUsername } from "@/lib/users";
import { createSession } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const username = String(body.username || "").trim();
  const password = String(body.password || "");

  if (!username || !password) {
    return NextResponse.json({ ok: false, message: "Eksik bilgi" }, { status: 400 });
  }

  const user = await getUserByUsername(username);

  if (!user || !user.active) {
    return NextResponse.json({ ok: false, message: "Yetkisiz" }, { status: 401 });
  }

  // DÜZ METİN ŞİFRE KARŞILAŞTIRMA
  if (user.password !== password) {
    return NextResponse.json({ ok: false, message: "Hatalı şifre" }, { status: 401 });
  }

  const token = await createSession({
    sub: user.username,
    role: user.role,
    restaurant: user.restaurant,
    name: user.name,
  });

  const res = NextResponse.json({
    ok: true,
    user: { username: user.username, name: user.name, role: user.role, restaurant: user.restaurant },
  });

  res.cookies.set("opssstay_session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
