import { PenTool, Palette, BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";

const features = [
  {
    href: "/writing",
    icon: PenTool,
    title: "집필 지원",
    description: "목차 생성, 문장 다듬기, 논리 흐름 검토",
    color: "bg-blue-500",
  },
  {
    href: "/design",
    icon: Palette,
    title: "편집·디자인",
    description: "표지 디자인, 내지 레이아웃, 판매 페이지",
    color: "bg-purple-500",
  },
  {
    href: "/visual",
    icon: BarChart3,
    title: "시각 자료 생성",
    description: "설명용 그림, 그래프·차트 자동 생성",
    color: "bg-emerald-500",
  },
];

export default function Home() {
  return (
    <div className="max-w-4xl">
      {/* 히어로 섹션 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-3">
          AI와 함께 책을 만들어보세요
        </h2>
        <p className="text-foreground/60 text-lg">
          출판 경험이 없어도 괜찮습니다. 집필부터 디자인까지 AI가 도와드립니다.
        </p>
      </section>

      {/* 기능 카드 */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Link
            key={feature.href}
            href={feature.href}
            className="group bg-card-bg border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div
              className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
            >
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-foreground/60 mb-4">
              {feature.description}
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
              시작하기 <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
