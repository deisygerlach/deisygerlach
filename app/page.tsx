"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("langDGerlach");
    const locale =
      saved === "eng" || saved === "por" || saved === "esp" ? saved : "esp";
    router.replace(`/${locale}/`);
  }, [router]);

  return null;
}
