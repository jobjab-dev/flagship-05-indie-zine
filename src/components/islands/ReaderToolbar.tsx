import { useEffect, useState } from "react";
import { Type } from "lucide-react";

const FONT_SIZES = [16, 18, 20, 22] as const;
const LINE_HEIGHTS = [
  { label: "Compact", value: 1.55 },
  { label: "Editorial", value: 1.72 },
  { label: "Airy", value: 1.92 },
] as const;

export function ReaderToolbar() {
  const [fontSize, setFontSize] = useState<number>(18);
  const [lineHeight, setLineHeight] = useState<number>(1.72);

  useEffect(() => {
    try {
      const savedSize = Number(localStorage.getItem("press09_font_size"));
      const savedLh = Number(localStorage.getItem("press09_line_height"));
      if (FONT_SIZES.includes(savedSize as (typeof FONT_SIZES)[number])) {
        setFontSize(savedSize);
      }
      if (LINE_HEIGHTS.some((item) => item.value === savedLh)) {
        setLineHeight(savedLh);
      }
    } catch {
      // ignore storage failure
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--reader-font-size",
      `${fontSize}px`
    );
    document.documentElement.style.setProperty(
      "--reader-line-height",
      String(lineHeight)
    );
    try {
      localStorage.setItem("press09_font_size", String(fontSize));
      localStorage.setItem("press09_line_height", String(lineHeight));
    } catch {
      // ignore
    }
  }, [fontSize, lineHeight]);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-y border-[#DCD9CE] bg-[#ECEAE2]/55 px-4 py-2.5">
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#55534D]">
        <Type className="h-3.5 w-3.5 text-[#0038FF]" />
        <span>Reading Typography</span>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {/* Font Size Stepper */}
        <div className="flex items-center gap-1" role="group" aria-label="Font size">
          <span className="mr-1 font-mono text-[10px] text-[#55534D]">SIZE</span>
          {FONT_SIZES.map((sz) => (
            <button
              key={sz}
              type="button"
              onClick={() => setFontSize(sz)}
              className={`border px-2 py-0.5 font-mono text-[11px] tabular-nums transition-colors ${
                fontSize === sz
                  ? "border-[#0038FF] bg-[#0038FF] text-white"
                  : "border-[#DCD9CE] bg-[#F7F6F2] text-[#111111] hover:border-[#0038FF]"
              }`}
            >
              {sz}
            </button>
          ))}
        </div>

        {/* Line Height Presets */}
        <div className="flex items-center gap-1" role="group" aria-label="Line height">
          <span className="mr-1 font-mono text-[10px] text-[#55534D]">LEADING</span>
          {LINE_HEIGHTS.map((lh) => (
            <button
              key={lh.label}
              type="button"
              onClick={() => setLineHeight(lh.value)}
              className={`border px-2 py-0.5 font-mono text-[11px] transition-colors ${
                lineHeight === lh.value
                  ? "border-[#111111] bg-[#111111] text-[#E9FF32]"
                  : "border-[#DCD9CE] bg-[#F7F6F2] text-[#111111] hover:border-[#111111]"
              }`}
            >
              {lh.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
