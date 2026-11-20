import { useEffect, useState } from "react";
import { Bookmark, Highlighter, Trash2, X } from "lucide-react";

export interface SavedQuote {
  id: string;
  articleSlug: string;
  articleTitle: string;
  text: string;
  savedAt: number;
}

const STORAGE_KEY = "press09_quotes_v1";

interface QuoteClipperProps {
  articleSlug: string;
  articleTitle: string;
  featuredPullQuote: string;
}

function readQuotes(): SavedQuote[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedQuote[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function QuoteClipper({
  articleSlug,
  articleTitle,
  featuredPullQuote,
}: QuoteClipperProps) {
  const [quotes, setQuotes] = useState<SavedQuote[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectionPrompt, setSelectionPrompt] = useState<{
    text: string;
    top: number;
    left: number;
  } | null>(null);

  useEffect(() => {
    setQuotes(readQuotes());

    const onClearEvent = () => {
      localStorage.removeItem(STORAGE_KEY);
      setQuotes([]);
    };
    window.addEventListener("press09-clear-quotes", onClearEvent);

    const onMouseUp = () => {
      const sel = window.getSelection();
      const selected = sel?.toString().trim() ?? "";
      if (selected.length < 18 || selected.length > 420) {
        setSelectionPrompt(null);
        return;
      }
      const articleEl = document.getElementById("essay-article-body");
      if (!articleEl || !sel?.anchorNode || !articleEl.contains(sel.anchorNode)) {
        setSelectionPrompt(null);
        return;
      }
      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectionPrompt({
        text: selected,
        top: Math.max(64, rect.top - 42),
        left: Math.min(window.innerWidth - 200, Math.max(16, rect.left)),
      });
    };

    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("press09-clear-quotes", onClearEvent);
    };
  }, []);

  const saveQuote = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setQuotes((prev) => {
      if (prev.some((q) => q.text === trimmed)) return prev;
      const next: SavedQuote[] = [
        {
          id: `q-${Date.now()}`,
          articleSlug,
          articleTitle,
          text: trimmed,
          savedAt: Date.now(),
        },
        ...prev,
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
    setSelectionPrompt(null);
    window.getSelection()?.removeAllRanges();
    setDrawerOpen(true);
  };

  const deleteQuote = (id: string) => {
    setQuotes((prev) => {
      const next = prev.filter((q) => q.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const isPullQuoteSaved = quotes.some((q) => q.text === featuredPullQuote);

  return (
    <>
      {/* Inline Pull-Quote Highlight Box */}
      <blockquote className="my-7 border-2 border-[#111111] bg-[#E9FF32]/40 p-5">
        <p className="font-serif text-lg sm:text-xl italic leading-snug text-[#111111]">
          “{featuredPullQuote}”
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#55534D]">
            Select any paragraph text to highlight · or clip pull quote
          </span>
          <button
            type="button"
            onClick={() => saveQuote(featuredPullQuote)}
            className={`inline-flex items-center gap-1.5 border px-3 py-1 font-mono text-[11px] font-semibold transition-colors ${
              isPullQuoteSaved
                ? "border-[#111111] bg-[#E9FF32] text-[#111111]"
                : "border-[#0038FF] bg-[#0038FF] text-white hover:bg-[#0028C4]"
            }`}
          >
            <Highlighter className="h-3.5 w-3.5" />
            {isPullQuoteSaved ? "Saved to Clippings" : "Clip Quote"}
          </button>
        </div>
      </blockquote>

      {/* Floating Selection Highlighter Popover */}
      {selectionPrompt && (
        <div
          style={{
            position: "fixed",
            top: `${selectionPrompt.top}px`,
            left: `${selectionPrompt.left}px`,
          }}
          className="z-50"
        >
          <button
            type="button"
            onClick={() => saveQuote(selectionPrompt.text)}
            className="inline-flex items-center gap-1.5 border-2 border-[#111111] bg-[#E9FF32] px-3 py-1.5 font-mono text-xs font-semibold text-[#111111] shadow-[0_6px_16px_rgba(17,17,17,0.18)]"
          >
            <Highlighter className="h-3.5 w-3.5" />
            Highlight &amp; Save Quote
          </button>
        </div>
      )}

      {/* Floating Clippings Toggle Pill */}
      <button
        type="button"
        onClick={() => setDrawerOpen((v) => !v)}
        className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 border border-[#111111] bg-[#E9FF32] px-3.5 py-1.5 font-mono text-[11px] font-semibold text-[#111111] shadow-[0_4px_14px_rgba(17,17,17,0.12)] hover:bg-[#D9F01E]"
      >
        <Bookmark className="h-3.5 w-3.5" />
        Clippings ({quotes.length})
      </button>

      {/* Slide-out Saved Clippings Panel */}
      {drawerOpen && (
        <aside className="fixed right-4 bottom-14 z-50 w-[330px] max-w-[calc(100vw-2rem)] border-2 border-[#111111] bg-[#F7F6F2] p-4 shadow-[0_16px_40px_rgba(17,17,17,0.2)]">
          <div className="flex items-center justify-between border-b border-[#DCD9CE] pb-2.5">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#0038FF]">
              Saved Personal Quotes
            </span>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close Clippings drawer"
              className="p-1 text-[#55534D] hover:text-[#111111]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {quotes.length === 0 ? (
            <p className="mt-3 font-mono text-xs text-[#55534D]">
              Highlight text inside any essay or click &ldquo;Clip Quote&rdquo; to collect passages here.
            </p>
          ) : (
            <ul className="mt-3 max-h-[290px] space-y-2.5 overflow-y-auto pr-1">
              {quotes.map((q) => (
                <li
                  key={q.id}
                  className="border border-[#DCD9CE] bg-[#E9FF32]/30 p-2.5"
                >
                  <p className="font-serif text-xs leading-relaxed text-[#111111]">
                    “{q.text}”
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-2 font-mono text-[10px] text-[#55534D]">
                    <span className="truncate">{q.articleTitle}</span>
                    <button
                      type="button"
                      onClick={() => deleteQuote(q.id)}
                      aria-label="Delete saved quote"
                      className="shrink-0 text-[#55534D] hover:text-[#FF3B6B]"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </aside>
      )}
    </>
  );
}
