"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getSessionToken } from "@/lib/session";

export default function ClientGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = getSessionToken();
    if (!token) {
      router.replace(`/login?next=${encodeURIComponent(pathname || "/panel")}`);
    }
  }, [router, pathname]);

  return <>{children}</>;
}
