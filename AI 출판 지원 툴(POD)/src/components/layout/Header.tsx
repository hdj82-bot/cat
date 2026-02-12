"use client";

import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/": "대시보드",
  "/writing": "집필 지원",
  "/design": "편집·디자인",
  "/visual": "시각 자료 생성",
  "/settings": "설정",
};

export default function Header() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || "AI 출판 지원";

  return (
    <header className="h-16 border-b border-border bg-card-bg flex items-center justify-between px-8">
      <h1 className="text-xl font-bold text-foreground">{title}</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-foreground/50">v0.1.0</span>
      </div>
    </header>
  );
}
