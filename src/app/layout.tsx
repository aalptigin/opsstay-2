import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Opsstay",
  description: "Misafir Ön Kontrol & Güvenli Konaklama",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
