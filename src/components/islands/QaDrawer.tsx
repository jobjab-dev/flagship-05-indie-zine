import { useEffect, useState } from "react";
import { SlidersHorizontal, X, Lock, RotateCcw, Eraser } from "lucide-react";
import { ZINE_ARTICLES } from "../../data/articles";

export function QaDrawer() {
  const [open, setOpen] = useState(false);
  const [readsCount, setReadsCount] = useState(0);
  const [member, setMember] = useState(false);

  const syncFromBrowser = () => {
    try {
      const rawReads = localStorage.getItem("press09_reads_v1");
      const parsed = rawReads ? (JSON.parse(rawReads) as string[]) : [];
      setReadsCount(Array.isArray(parsed) ? parsed.length : 0);
      setMember(
        localStorage.getItem("press09_member_v1") === "1" ||
          document.cookie.includes("press09_member=1")
      );
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    syncFromBrowser();
    window.addEventListener("press09-meter-sync", syncFromBrowser);
    return () => window.removeEventListener("press09-meter-sync", syncFromBrowser);
  }, []);

  const handleSimulateTwoReads = async () => {
    try {
      await fetch("/api/unlock", { method: "DELETE" });
    } catch {
      // ignore
    }
    const twoSlugs = ZINE_ARTICLES.slice(0, 2).map((a) => a.slug);
    localStorage.setItem("press09_reads_v1", JSON.stringify(twoSlugs));
    localStorage.removeItem("press09_member_v1");
    document.cookie = `press09_reads=${encodeURIComponent(
      twoSlugs.join(",")
    )}; path=/; max-age=2592000; SameSite=Lax`;
    document.cookie = "press09_member=; path=/; max-age=0";
    syncFromBrowser();
    window.dispatchEvent(new CustomEvent("press09-meter-sync"));
  };

  const handleResetPaywall = async () => {
    try {
      await fetch("/api/unlock", { method: "DELETE" });
    } catch {
      // ignore
    }
    localStorage.removeItem("press09_reads_v1");
    localStorage.removeItem("press09_member_v1");
    document.cookie = "press09_reads=; path=/; max-age=0";
    document.cookie = "press09_member=; path=/; max-age=0";
    syncFromBrowser();
    window.dispatchEvent(new CustomEvent("press09-meter-sync"));
  };

  const handleClearClippings = () => {
    window.dispatchEvent(new CustomEvent("press09-clear-quotes"));
  };

  return (
    <div className="fixed bottom-4 left-4 z-40">
      {open ? (
        <div className="w-[295px] border-2 border-[#111111] bg-[#F7F6F2] p-3.5 text-[#111111] shadow-[0_14px_34px_rgba(17,17,17,0.16)]">
          <div className="flex items-center justify-between border-b border-[#DCD9CE] pb-2">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#0038FF]">
              Showcase / QA Zine
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close Showcase / QA drawer"
              className="p-1 text-[#55534D] hover:text-[#111111]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-2.5 flex justify-between bg-[#ECEAE2] px-2.5 py-1.5 font-mono text-[10px]">
            <span>Reads: {readsCount}/2</span>
            <span className={member ? "text-[#0038FF] font-semibold" : "text-[#FF3B6B] font-semibold"}>
              {member ? "PATRON PASS" : "METERED"}
            </span>
          </div>

          <div className="mt-2.5 flex flex-col gap-1.5">
            <button
              type="button"
              onClick={handleSimulateTwoReads}
              className="flex items-center justify-between border border-[#DCD9CE] bg-white px-2.5 py-2 text-left font-mono text-[11px] hover:border-[#FF3B6B]"
            >
              <span className="inline-flex items-center gap-2">
                <Lock className="h-3.5 w-3.5 text-[#FF3B6B]" />
                Prefill 2 Reads Used
              </span>
              <span className="text-[10px] text-[#55534D]">WALL NEXT</span>
            </button>

            <button
              type="button"
              onClick={handleResetPaywall}
              className="flex items-center justify-between border border-[#DCD9CE] bg-white px-2.5 py-2 text-left font-mono text-[11px] hover:border-[#0038FF]"
            >
              <span className="inline-flex items-center gap-2">
                <RotateCcw className="h-3.5 w-3.5 text-[#0038FF]" />
                Reset Meter &amp; Cookies
              </span>
              <span className="text-[10px] text-[#55534D]">0/2</span>
            </button>

            <button
              type="button"
              onClick={handleClearClippings}
              className="flex items-center justify-between border border-[#DCD9CE] bg-white px-2.5 py-2 text-left font-mono text-[11px] hover:border-[#111111]"
            >
              <span className="inline-flex items-center gap-2">
                <Eraser className="h-3.5 w-3.5 text-[#55534D]" />
                Clear Saved Clippings
              </span>
              <span className="text-[10px] text-[#55534D]">QUOTES</span>
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-[#111111] bg-[#F7F6F2]/95 px-3.5 py-1.5 font-mono text-[11px] font-medium text-[#111111] shadow-[0_4px_12px_rgba(17,17,17,0.1)] hover:border-[#0038FF]"
        >
          <SlidersHorizontal className="h-3.5 w-3.5 text-[#0038FF]" />
          Showcase / QA
        </button>
      )}
    </div>
  );
}
