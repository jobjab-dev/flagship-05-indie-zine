import { useEffect, useState } from "react";
import { Lock, Sparkles, CheckCircle2 } from "lucide-react";
import type { ZineSection } from "../../data/articles";

interface MeteredPaywallProps {
  slug: string;
  initialMember: boolean;
  initialReads: string[];
  sections: ZineSection[];
}

const READS_STORAGE_KEY = "press09_reads_v1";
const MEMBER_STORAGE_KEY = "press09_member_v1";
const FREE_LIMIT = 2;

function getCookie(name: string): string | null {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

function setCookie(name: string, value: string, maxAgeDays = 30) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${
    maxAgeDays * 86400
  }; SameSite=Lax`;
}

function parseReadsList(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return raw.split(",").map((s) => s.trim()).filter(Boolean);
  }
}

export function MeteredPaywall({
  slug,
  initialMember,
  initialReads,
  sections,
}: MeteredPaywallProps) {
  const [isMember, setIsMember] = useState<boolean>(initialMember);
  const [reads, setReads] = useState<string[]>(initialReads);
  const [locked, setLocked] = useState<boolean>(false);
  const [unlocking, setUnlocking] = useState<boolean>(false);
  const [justUnlocked, setJustUnlocked] = useState<boolean>(false);

  useEffect(() => {
    const evaluateMeter = () => {
      const cookieMember = getCookie("press09_member") === "1";
      const storageMember = localStorage.getItem(MEMBER_STORAGE_KEY) === "1";
      const member = initialMember || cookieMember || storageMember;

      const cookieReads = parseReadsList(getCookie("press09_reads"));
      const storageReads = parseReadsList(localStorage.getItem(READS_STORAGE_KEY));
      const merged = Array.from(
        new Set([...initialReads, ...cookieReads, ...storageReads])
      );

      if (member) {
        setIsMember(true);
        setReads(merged);
        setLocked(false);
        return;
      }

      const alreadyCounted = merged.includes(slug);
      if (alreadyCounted) {
        const index = merged.indexOf(slug);
        setIsMember(false);
        setReads(merged);
        setLocked(index >= FREE_LIMIT);
        return;
      }

      if (merged.length < FREE_LIMIT) {
        const updated = [...merged, slug];
        localStorage.setItem(READS_STORAGE_KEY, JSON.stringify(updated));
        setCookie("press09_reads", updated.join(","));
        setIsMember(false);
        setReads(updated);
        setLocked(false);
      } else {
        // 3rd+ distinct article hits metered Soft Paywall
        setIsMember(false);
        setReads(merged);
        setLocked(true);
      }

      window.dispatchEvent(new CustomEvent("press09-meter-sync"));
    };

    evaluateMeter();

    const onReset = () => evaluateMeter();
    window.addEventListener("press09-meter-sync", onReset);
    return () => window.removeEventListener("press09-meter-sync", onReset);
  }, [slug, initialMember, initialReads]);

  const handleInstantUnlock = async () => {
    setUnlocking(true);
    try {
      await fetch("/api/unlock", { method: "POST" });
    } catch {
      // Fallback gracefully on static preview
    }
    localStorage.setItem(MEMBER_STORAGE_KEY, "1");
    setCookie("press09_member", "1");
    setIsMember(true);
    setLocked(false);
    setUnlocking(false);
    setJustUnlocked(true);
    window.dispatchEvent(new CustomEvent("press09-meter-sync"));
  };

  // First section opening paragraphs stay visible; soft paywall gates remainder when locked
  const firstSection = sections[0];
  const previewParagraphs = firstSection ? firstSection.paragraphs.slice(0, 2) : [];
  const restFirstParagraphs = firstSection ? firstSection.paragraphs.slice(2) : [];
  const remainingSections = sections.slice(1);

  return (
    <div id="essay-article-body" className="essay-prose mt-6">
      {/* Live Meter Status Strip */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border border-[#DCD9CE] bg-[#ECEAE2]/65 px-3.5 py-2 font-mono text-[11px]">
        {isMember ? (
          <span className="inline-flex items-center gap-1.5 font-semibold text-[#0038FF]">
            <CheckCircle2 className="h-3.5 w-3.5" />
            PATRON EDITION UNLOCKED · ALL ESSAYS OPEN
          </span>
        ) : locked ? (
          <span className="inline-flex items-center gap-1.5 font-semibold text-[#FF3B6B]">
            <Lock className="h-3.5 w-3.5" />
            FREE METER REACHED (2 / 2 FREE READS USED)
          </span>
        ) : (
          <span className="text-[#55534D]">
            FREE EDITION METER:{" "}
            <strong className="text-[#111111]">
              {Math.min(FREE_LIMIT, reads.length)} / {FREE_LIMIT} ARTICLES USED
            </strong>
          </span>
        )}
        <span className="text-[#55534D]">UNCOATED RISO ARCHIVE</span>
      </div>

      {justUnlocked && (
        <div
          role="status"
          className="mb-6 border border-[#0038FF] bg-[#0038FF]/8 px-4 py-2.5 font-mono text-xs font-medium text-[#0038FF]"
        >
          Patron Pass active — full essay unlocked instantaneously.
        </div>
      )}

      {/* Always readable lead paragraphs */}
      <div className="space-y-5 text-[#111111]">
        {previewParagraphs.map((para, i) => (
          <p key={`lead-${i}`}>{para}</p>
        ))}
      </div>

      {locked ? (
        <div className="relative mt-6">
          {/* Teaser blurred tail so reader feels editorial depth behind the veil */}
          <div
            aria-hidden="true"
            className="pointer-events-none select-none space-y-5 blur-[5px] opacity-45 max-h-40 overflow-hidden"
          >
            {restFirstParagraphs.map((para, i) => (
              <p key={`blur-p-${i}`}>{para}</p>
            ))}
            {remainingSections[0]?.paragraphs.slice(0, 1).map((para, i) => (
              <p key={`blur-sec-${i}`}>{para}</p>
            ))}
          </div>

          {/* Soft Riso Paywall Card */}
          <div
            data-testid="soft-paywall-gate"
            className="relative -mt-14 border-2 border-[#111111] bg-[#F7F6F2] p-6 sm:p-8 shadow-[0_14px_34px_rgba(17,17,17,0.12)]"
          >
            <div className="inline-flex items-center gap-2 border border-[#FF3B6B] bg-[#FF3B6B]/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#FF3B6B]">
              <Lock className="h-3 w-3" />
              Issue 09 · Metered Reader Colophon
            </div>

            <h2 className="mt-4 font-display text-2xl sm:text-3xl font-bold leading-tight text-[#111111]">
              You’ve read your 2 complimentary essays in Issue 09.
            </h2>

            <p className="mt-3 text-base leading-relaxed text-[#55534D]">
              PRESS 09 is reader-funded without display advertising or programmatic tracking. Activate an instant Patron Pass to unlock all five long-form essays and sync your clippings archive.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={unlocking}
                onClick={handleInstantUnlock}
                className="inline-flex items-center gap-2 border-2 border-[#111111] bg-[#0038FF] px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#0029C7] transition-colors disabled:opacity-60"
              >
                <Sparkles className="h-4 w-4 text-[#E9FF32]" />
                {unlocking ? "Activating Pass..." : "Instant Patron Unlock (Free Demo)"}
              </button>

              <a
                href="/"
                className="border border-[#111111] bg-transparent px-4 py-3 font-mono text-xs font-medium text-[#111111] hover:bg-[#ECEAE2]"
              >
                Back to Issue Index
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-5 space-y-5 text-[#111111]">
          {restFirstParagraphs.map((para, i) => (
            <p key={`rest-${i}`}>{para}</p>
          ))}

          {remainingSections.map((sec, sIdx) => (
            <section key={`sec-${sIdx}`} className="pt-4">
              {sec.heading && (
                <h2 className="mb-3 font-display text-2xl font-bold tracking-tight text-[#111111]">
                  {sec.heading}
                </h2>
              )}
              <div className="space-y-5">
                {sec.paragraphs.map((para, pIdx) => (
                  <p key={`p-${sIdx}-${pIdx}`}>{para}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
