import { SignJWT, importPKCS8 } from "jose";

const SHEETS_ID = process.env.GOOGLE_SHEETS_ID!;
const SA_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!;
const PRIVATE_KEY = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");

let cachedToken: { token: string; exp: number } | null = null;

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && cachedToken.exp - 60 > now) return cachedToken.token;

  const pk = await importPKCS8(PRIVATE_KEY, "RS256");

  const jwt = await new SignJWT({
    iss: SA_EMAIL,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
  })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(pk);

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const json: any = await res.json();
  if (!res.ok) throw new Error(json?.error_description || "Token error");

  cachedToken = { token: json.access_token, exp: now + (json.expires_in || 3600) };
  return cachedToken.token;
}

async function sheetsGET(path: string) {
  const token = await getAccessToken();
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_ID}/${path}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  const json: any = await res.json();
  if (!res.ok) throw new Error(json?.error?.message || "Sheets GET error");
  return json;
}

async function sheetsPOST(path: string, body: any) {
  const token = await getAccessToken();
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_ID}/${path}`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const json: any = await res.json();
  if (!res.ok) throw new Error(json?.error?.message || "Sheets POST error");
  return json;
}

async function getSheetIdByTitle(title: string) {
  const meta = await sheetsGET(`?fields=sheets(properties(sheetId,title))`);
  const s = (meta.sheets || []).find((x: any) => x.properties?.title === title);
  if (!s) throw new Error(`Sheet not found: ${title}`);
  return s.properties.sheetId as number;
}

// username=email, passwordHash vs.
export async function listUsers() {
  const data = await sheetsGET(`values/Users!A1:F`);
  const values: string[][] = data.values || [];
  const rows = values.slice(1).map((r) => ({
    username: r[0] || "",
    name: r[1] || "",
    role: r[2] || "",
    restaurant: r[3] || "",
    passwordHash: r[4] || "",
    active: (r[5] || "").toLowerCase() === "true",
  }));
  return rows.filter((u) => u.username);
}

export async function deleteUserByUsername(username: string) {
  const data = await sheetsGET(`values/Users!A1:A`);
  const values: string[][] = data.values || [];
  // header satırı 1, data satırları 2..N
  const idx = values.findIndex((r, i) => i > 0 && (r?.[0] || "").trim() === username);
  if (idx === -1) return; // yoksa sessiz geç

  const sheetId = await getSheetIdByTitle("Users");

  // Sheets API row index 0-based
  const startIndex = idx;      // idx zaten header dahil sayılıyor; header=0, ilk data=1...
  const endIndex = idx + 1;

  await sheetsPOST(`:batchUpdate`, {
    requests: [
      {
        deleteDimension: {
          range: {
            sheetId,
            dimension: "ROWS",
            startIndex,
            endIndex,
          },
        },
      },
    ],
  });
}
