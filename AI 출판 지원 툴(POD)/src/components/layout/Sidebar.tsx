"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  PenTool,
  Palette,
  BarChart3,
  Home,
  Settings,
} from "lucide-react";

const navItems = [
  { href: "/", label: "홈", icon: Home },
  { href: "/writing", label: "집필 지원", icon: PenTool },
  { href: "/design", label: "편집·디자인", icon: Palette },
  { href: "/visual", label: "시각 자료", icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar-bg text-sidebar-text flex flex-col">
      {/* 로고 */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <BookOpen className="w-7 h-7 text-sidebar-active" />
        <span className="text-lg font-bold tracking-tight">AI 출판 지원</span>
      </div>

      {/* 내비게이션 */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-sidebar-active text-white"
                  : "text-sidebar-text/70 hover:bg-white/10 hover:text-sidebar-text"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* 하단 설정 */}
      <div className="px-3 py-4 border-t border-white/10">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-text/70 hover:bg-white/10 hover:text-sidebar-text transition-colors"
        >
          <Settings className="w-5 h-5" />
          설정
        </Link>
      </div>
    </aside>
  );
}
