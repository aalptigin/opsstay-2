import { NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
  const token = cookies().get("opssstay_session")?.value;
  if (!token) return NextResponse.json({ user: null }, { status: 401 });

  const u = await verifySession(token);
  if (!u) return NextResponse.json({ user: null }, { status: 401 });

  return NextResponse.json({ user: u });
}
