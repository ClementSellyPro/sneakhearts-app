"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterDisplayCondition() {
  const path = usePathname();
  if (path === "/login" || path === "/register") return null;
  return <Footer />;
}
