import { valuesGet } from "@/lib/gs";

export type UserRow = {
  username: string;
  name: string;
  role: string;
  restaurant: string;
  password: string;  // düz metin (E sütunu)
  active: boolean;
};

export async function getUserByUsername(username: string): Promise<UserRow | null> {
  const res = await valuesGet("Users!A2:F");
  const rows: any[][] = res?.values || [];

  for (const r of rows) {
    const u = (r?.[0] || "").trim();
    if (!u) continue;

    if (u.toLowerCase() === username.toLowerCase()) {
      return {
        username: u,
        name: (r?.[1] || "").toString(),
        role: (r?.[2] || "").toString(),
        restaurant: (r?.[3] || "").toString(),
        password: (r?.[4] || "").toString(), // E sütunu
        active: String(r?.[5] || "").toLowerCase() === "true",
      };
    }
  }
  return null;
}
