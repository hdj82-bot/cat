"use client";

import { Image, Layout, AlignLeft, ShoppingCart } from "lucide-react";

const tools = [
  {
    icon: Image,
    title: "표지 디자인",
    description: "템플릿 기반으로 책 표지와 날개를 간편하게 제작합니다.",
    status: "준비 중",
  },
  {
    icon: Layout,
    title: "내지 레이아웃",
    description: "판형별 본문 레이아웃 템플릿을 제공합니다.",
    status: "준비 중",
  },
  {
    icon: AlignLeft,
    title: "머리말·꼬리말",
    description: "페이지 머리말과 꼬리말을 자동으로 삽입합니다.",
    status: "준비 중",
  },
  {
    icon: ShoppingCart,
    title: "판매 페이지",
    description: "도서 정보를 입력하면 온라인 판매 페이지를 구성해줍니다.",
    status: "준비 중",
  },
];

export default function DesignPage() {
  return (
    <div className="max-w-4xl">
      <p className="text-foreground/60 mb-8">
        전문 디자이너 없이도 표지, 내지, 판매 페이지를 제작할 수 있습니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <div
            key={tool.title}
            className="bg-card-bg border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-purple-50 w-10 h-10 rounded-lg flex items-center justify-center">
                <tool.icon className="w-5 h-5 text-purple-500" />
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
