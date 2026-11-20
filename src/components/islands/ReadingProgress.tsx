import { useEffect, useState } from "react";

interface ReadingProgressProps {
  readMinutes: number;
  articleTitle: string;
}

export function ReadingProgress({ readMinutes, articleTitle }: ReadingProgressProps) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const computeProgress = () => {
      const target = document.getElementById("essay-article-body");
      if (!target) {
        const docH =
          document.documentElement.scrollHeight - window.innerHeight;
        setPct(docH > 0 ? Math.min(100, Math.max(0, Math.round((window.scrollY / docH) * 100))) : 0);
        return;
      }
      const rect = target.getBoundingClientRect();
      const total = Math.max(1, target.offsetHeight - window.innerHeight * 0.5);
      const passed = -rect.top + window.innerHeight * 0.25;
      setPct(Math.min(100, Math.max(0, Math.round((passed / total) * 100))));
    };

    computeProgress();
    window.addEventListener("scroll", computeProgress, { passive: true });
    window.addEventListener("resize", computeProgress);
    return () => {
      window.removeEventListener("scroll", computeProgress);
      window.removeEventListener("resize", computeProgress);
    };
  }, []);

  const remainingMin = Math.max(1, Math.ceil(readMinutes * (1 - pct / 100)));

  return (
    <div className="sticky top-0 z-30 border-b border-[#DCD9CE] bg-[#F7F6F2]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-5 py-2 font-mono text-[11px] text-[#55534D]">
        <span className="truncate max-w-[55vw] font-medium text-[#111111]">
          {articleTitle}
        </span>
        <div className="flex items-center gap-3 shrink-0 tabular-nums">
          <span>{pct >= 98 ? "FINISHED" : `${remainingMin}m left`}</span>
          <span className="font-semibold text-[#0038FF]">{pct}%</span>
        </div>
      </div>
      <div className="h-[3px] w-full bg-[#ECEAE2]">
        <div
          style={{ width: `${pct}%` }}
          className="h-full bg-[#0038FF] transition-[width] duration-150 ease-out"
        />
      </div>
    </div>
  );
}
