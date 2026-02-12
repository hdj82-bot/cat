"use client";

import { BookOpen, Sparkles, GitBranch, Type } from "lucide-react";

const tools = [
  {
    icon: BookOpen,
    title: "목차 생성",
    description: "책 주제를 입력하면 전체 구조와 목차를 제안해드립니다.",
    status: "준비 중",
  },
  {
    icon: Sparkles,
    title: "문장 다듬기 (윤문)",
    description: "선택한 문장을 자연스럽고 매끄럽게 다듬어줍니다.",
    status: "준비 중",
  },
  {
    icon: GitBranch,
    title: "논리 흐름 검토",
    description: "본문의 논리적 흐름과 구성을 분석하고 개선점을 제안합니다.",
    status: "준비 중",
  },
  {
    icon: Type,
    title: "무료 폰트 안내",
    description: "상업적으로 사용 가능한 무료 폰트를 추천해드립니다.",
    status: "준비 중",
  },
];

export default function WritingPage() {
  return (
    <div className="max-w-4xl">
      <p className="text-foreground/60 mb-8">
        AI가 책의 구조부터 문장 다듬기까지 집필 전 과정을 도와드립니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <div
            key={tool.title}
            className="bg-card-bg border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center">
                <tool.icon className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-xs font-medium text-foreground/40 bg-foreground/5 px-2 py-1 rounded">
                {tool.status}
              </span>
            </div>
            <h3 className="text-base font-semibold mb-2">{tool.title}</h3>
            <p className="text-sm text-foreground/60">{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
