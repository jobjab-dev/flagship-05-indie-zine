import { useEffect, useState } from "react";

export function MeterStatusBadge() {
  const [label, setLabel] = useState("2 FREE READS / ISSUE");

  useEffect(() => {
    const refresh = () => {
      const member =
        localStorage.getItem("press09_member_v1") === "1" ||
        document.cookie.includes("press09_member=1");
      if (member) {
        setLabel("PATRON PASS · UNLOCKED");
        return;
      }
      try {
        const raw = localStorage.getItem("press09_reads_v1");
        const arr = raw ? (JSON.parse(raw) as string[]) : [];
        const used = Array.isArray(arr) ? Math.min(2, arr.length) : 0;
        setLabel(`METER: ${used}/2 FREE READS`);
      } catch {
        setLabel("2 FREE READS / ISSUE");
      }
    };

    refresh();
    window.addEventListener("press09-meter-sync", refresh);
    document.addEventListener("astro:after-swap", refresh);
    return () => {
      window.removeEventListener("press09-meter-sync", refresh);
      document.removeEventListener("astro:after-swap", refresh);
    };
  }, []);

  return (
    <span className="border border-[#0038FF]/30 bg-[#0038FF]/8 px-2.5 py-1 font-mono text-[10px] font-semibold text-[#0038FF] tabular-nums">
      {label}
    </span>
  );
}
