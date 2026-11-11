"use client";

import { usePathname } from "next/navigation";
import { useSiteMotion } from "@/hooks/site/use-site-motion";

/** Ativa as animações de rolagem. O conteúdo continua legível sem JavaScript. */
export function MotionRoot() {
  const pathname = usePathname();
  useSiteMotion(pathname);
  return <div className="reading-progress" aria-hidden="true" />;
}
