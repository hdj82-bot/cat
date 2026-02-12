"use client";

import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import Image from "next/image";

const pageTitles: Record<string, string> = {
  "/": "대시보드",
  "/writing": "집필 지원",
  "/design": "편집·디자인",
  "/visual": "시각 자료 생성",
  "/settings": "설정",
};

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const title = pageTitles[pathname] || "AI 출판 지원";

  return (
    <header className="h-16 border-b border-border bg-card-bg flex items-center justify-between px-8">
      <h1 className="text-xl font-bold text-foreground">{title}</h1>
      <div className="flex items-center gap-4">
        {session?.user && (
          <>
            <div className="flex items-center gap-2">
              {session.user.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name ?? "사용자"}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span className="text-sm font-medium text-foreground">
                {session.user.name}
              </span>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-sm text-foreground/50 hover:text-foreground transition-colors flex items-center gap-1 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              로그아웃
            </button>
          </>
        )}
      </div>
    </header>
  );
}
