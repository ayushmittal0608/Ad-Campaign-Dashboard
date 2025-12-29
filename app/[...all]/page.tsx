"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CatchAllRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/"); // redirect to home
  }, [router]);

  return null; // render nothing
}
