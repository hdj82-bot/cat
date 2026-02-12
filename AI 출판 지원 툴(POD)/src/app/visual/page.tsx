"use client";

import { ImagePlus, BarChart3 } from "lucide-react";

const tools = [
  {
    icon: ImagePlus,
    title: "설명용 그림 생성",
    description:
      "본문 내용에 맞는 설명용 일러스트를 AI가 자동으로 생성합니다.",
    status: "준비 중",
  },
  {
    icon: BarChart3,
    title: "그래프·차트 제작",
    description: "데이터를 입력하면 깔끔한 그래프와 차트를 만들어줍니다.",
    status: "준비 중",
  },
];

export default function VisualPage() {
  return (
    <div className="max-w-4xl">
      <p className="text-foreground/60 mb-8">
        책에 필요한 시각 자료를 AI가 자동으로 생성해드립니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <div
            key={tool.title}
            className="bg-card-bg border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-emerald-50 w-10 h-10 rounded-lg flex items-center justify-center">
                <tool.icon className="w-5 h-5 text-emerald-500" />
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
