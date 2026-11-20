import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { d as maybeRenderHead, g as addAttribute, i as renderComponent, t as renderTransition, u as renderTemplate } from "./server_D2qI1hjZ.mjs";
import { t as createAstro } from "./compiler_BSbyAmI3.mjs";
import { n as ZINE_ARTICLES, r as createComponent, t as $$ZineLayout } from "./ZineLayout_DUzQMved.mjs";
import { useEffect, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Bookmark, CheckCircle2, Highlighter, Lock, Sparkles, Trash2, Type, X } from "lucide-react";
// src/components/islands/ReadingProgress.tsx
function ReadingProgress({ readMinutes, articleTitle }) {
	const [pct, setPct] = useState(0);
	useEffect(() => {
		const computeProgress = () => {
			const target = document.getElementById("essay-article-body");
			if (!target) {
				const docH = document.documentElement.scrollHeight - window.innerHeight;
				setPct(docH > 0 ? Math.min(100, Math.max(0, Math.round(window.scrollY / docH * 100))) : 0);
				return;
			}
			const rect = target.getBoundingClientRect();
			const total = Math.max(1, target.offsetHeight - window.innerHeight * .5);
			const passed = -rect.top + window.innerHeight * .25;
			setPct(Math.min(100, Math.max(0, Math.round(passed / total * 100))));
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
	return /* @__PURE__ */ jsxs("div", {
		className: "sticky top-0 z-30 border-b border-[#DCD9CE] bg-[#F7F6F2]/95 backdrop-blur-sm",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-5 py-2 font-mono text-[11px] text-[#55534D]",
			children: [/* @__PURE__ */ jsx("span", {
				className: "truncate max-w-[55vw] font-medium text-[#111111]",
				children: articleTitle
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-3 shrink-0 tabular-nums",
				children: [/* @__PURE__ */ jsx("span", { children: pct >= 98 ? "FINISHED" : `${remainingMin}m left` }), /* @__PURE__ */ jsxs("span", {
					className: "font-semibold text-[#0038FF]",
					children: [pct, "%"]
				})]
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "h-[3px] w-full bg-[#ECEAE2]",
			children: /* @__PURE__ */ jsx("div", {
				style: { width: `${pct}%` },
				className: "h-full bg-[#0038FF] transition-[width] duration-150 ease-out"
			})
		})]
	});
}
// src/components/islands/ReaderToolbar.tsx
var FONT_SIZES = [
	16,
	18,
	20,
	22
];
var LINE_HEIGHTS = [
	{
		label: "Compact",
		value: 1.55
	},
	{
		label: "Editorial",
		value: 1.72
	},
	{
		label: "Airy",
		value: 1.92
	}
];
function ReaderToolbar() {
	const [fontSize, setFontSize] = useState(18);
	const [lineHeight, setLineHeight] = useState(1.72);
	useEffect(() => {
		try {
			const savedSize = Number(localStorage.getItem("press09_font_size"));
			const savedLh = Number(localStorage.getItem("press09_line_height"));
			if (FONT_SIZES.includes(savedSize)) setFontSize(savedSize);
			if (LINE_HEIGHTS.some((item) => item.value === savedLh)) setLineHeight(savedLh);
		} catch {}
	}, []);
	useEffect(() => {
		document.documentElement.style.setProperty("--reader-font-size", `${fontSize}px`);
		document.documentElement.style.setProperty("--reader-line-height", String(lineHeight));
		try {
			localStorage.setItem("press09_font_size", String(fontSize));
			localStorage.setItem("press09_line_height", String(lineHeight));
		} catch {}
	}, [fontSize, lineHeight]);
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-wrap items-center justify-between gap-3 border-y border-[#DCD9CE] bg-[#ECEAE2]/55 px-4 py-2.5",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#55534D]",
			children: [/* @__PURE__ */ jsx(Type, { className: "h-3.5 w-3.5 text-[#0038FF]" }), /* @__PURE__ */ jsx("span", { children: "Reading Typography" })]
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex flex-wrap items-center gap-4",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-1",
				role: "group",
				"aria-label": "Font size",
				children: [/* @__PURE__ */ jsx("span", {
					className: "mr-1 font-mono text-[10px] text-[#55534D]",
					children: "SIZE"
				}), FONT_SIZES.map((sz) => /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => setFontSize(sz),
					className: `border px-2 py-0.5 font-mono text-[11px] tabular-nums transition-colors ${fontSize === sz ? "border-[#0038FF] bg-[#0038FF] text-white" : "border-[#DCD9CE] bg-[#F7F6F2] text-[#111111] hover:border-[#0038FF]"}`,
					children: sz
				}, sz))]
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-1",
				role: "group",
				"aria-label": "Line height",
				children: [/* @__PURE__ */ jsx("span", {
					className: "mr-1 font-mono text-[10px] text-[#55534D]",
					children: "LEADING"
				}), LINE_HEIGHTS.map((lh) => /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => setLineHeight(lh.value),
					className: `border px-2 py-0.5 font-mono text-[11px] transition-colors ${lineHeight === lh.value ? "border-[#111111] bg-[#111111] text-[#E9FF32]" : "border-[#DCD9CE] bg-[#F7F6F2] text-[#111111] hover:border-[#111111]"}`,
					children: lh.label
				}, lh.label))]
			})]
		})]
	});
}
// src/components/islands/QuoteClipper.tsx
var STORAGE_KEY = "press09_quotes_v1";
function readQuotes() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
function QuoteClipper({ articleSlug, articleTitle, featuredPullQuote }) {
	const [quotes, setQuotes] = useState([]);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [selectionPrompt, setSelectionPrompt] = useState(null);
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
			const rect = sel.getRangeAt(0).getBoundingClientRect();
			setSelectionPrompt({
				text: selected,
				top: Math.max(64, rect.top - 42),
				left: Math.min(window.innerWidth - 200, Math.max(16, rect.left))
			});
		};
		document.addEventListener("mouseup", onMouseUp);
		return () => {
			document.removeEventListener("mouseup", onMouseUp);
			window.removeEventListener("press09-clear-quotes", onClearEvent);
		};
	}, []);
	const saveQuote = (text) => {
		const trimmed = text.trim();
		if (!trimmed) return;
		setQuotes((prev) => {
			if (prev.some((q) => q.text === trimmed)) return prev;
			const next = [{
				id: `q-${Date.now()}`,
				articleSlug,
				articleTitle,
				text: trimmed,
				savedAt: Date.now()
			}, ...prev];
			localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
			return next;
		});
		setSelectionPrompt(null);
		window.getSelection()?.removeAllRanges();
		setDrawerOpen(true);
	};
	const deleteQuote = (id) => {
		setQuotes((prev) => {
			const next = prev.filter((q) => q.id !== id);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
			return next;
		});
	};
	const isPullQuoteSaved = quotes.some((q) => q.text === featuredPullQuote);
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsxs("blockquote", {
			className: "my-7 border-2 border-[#111111] bg-[#E9FF32]/40 p-5",
			children: [/* @__PURE__ */ jsxs("p", {
				className: "font-serif text-lg sm:text-xl italic leading-snug text-[#111111]",
				children: [
					"“",
					featuredPullQuote,
					"”"
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "mt-3 flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ jsx("span", {
					className: "font-mono text-[10px] uppercase tracking-wider text-[#55534D]",
					children: "Select any paragraph text to highlight · or clip pull quote"
				}), /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => saveQuote(featuredPullQuote),
					className: `inline-flex items-center gap-1.5 border px-3 py-1 font-mono text-[11px] font-semibold transition-colors ${isPullQuoteSaved ? "border-[#111111] bg-[#E9FF32] text-[#111111]" : "border-[#0038FF] bg-[#0038FF] text-white hover:bg-[#0028C4]"}`,
					children: [/* @__PURE__ */ jsx(Highlighter, { className: "h-3.5 w-3.5" }), isPullQuoteSaved ? "Saved to Clippings" : "Clip Quote"]
				})]
			})]
		}),
		selectionPrompt && /* @__PURE__ */ jsx("div", {
			style: {
				position: "fixed",
				top: `${selectionPrompt.top}px`,
				left: `${selectionPrompt.left}px`
			},
			className: "z-50",
			children: /* @__PURE__ */ jsxs("button", {
				type: "button",
				onClick: () => saveQuote(selectionPrompt.text),
				className: "inline-flex items-center gap-1.5 border-2 border-[#111111] bg-[#E9FF32] px-3 py-1.5 font-mono text-xs font-semibold text-[#111111] shadow-[0_6px_16px_rgba(17,17,17,0.18)]",
				children: [/* @__PURE__ */ jsx(Highlighter, { className: "h-3.5 w-3.5" }), "Highlight & Save Quote"]
			})
		}),
		/* @__PURE__ */ jsxs("button", {
			type: "button",
			onClick: () => setDrawerOpen((v) => !v),
			className: "fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 border border-[#111111] bg-[#E9FF32] px-3.5 py-1.5 font-mono text-[11px] font-semibold text-[#111111] shadow-[0_4px_14px_rgba(17,17,17,0.12)] hover:bg-[#D9F01E]",
			children: [
				/* @__PURE__ */ jsx(Bookmark, { className: "h-3.5 w-3.5" }),
				"Clippings (",
				quotes.length,
				")"
			]
		}),
		drawerOpen && /* @__PURE__ */ jsxs("aside", {
			className: "fixed right-4 bottom-14 z-50 w-[330px] max-w-[calc(100vw-2rem)] border-2 border-[#111111] bg-[#F7F6F2] p-4 shadow-[0_16px_40px_rgba(17,17,17,0.2)]",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between border-b border-[#DCD9CE] pb-2.5",
				children: [/* @__PURE__ */ jsx("span", {
					className: "font-mono text-xs font-semibold uppercase tracking-wider text-[#0038FF]",
					children: "Saved Personal Quotes"
				}), /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => setDrawerOpen(false),
					"aria-label": "Close Clippings drawer",
					className: "p-1 text-[#55534D] hover:text-[#111111]",
					children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
				})]
			}), quotes.length === 0 ? /* @__PURE__ */ jsx("p", {
				className: "mt-3 font-mono text-xs text-[#55534D]",
				children: "Highlight text inside any essay or click “Clip Quote” to collect passages here."
			}) : /* @__PURE__ */ jsx("ul", {
				className: "mt-3 max-h-[290px] space-y-2.5 overflow-y-auto pr-1",
				children: quotes.map((q) => /* @__PURE__ */ jsxs("li", {
					className: "border border-[#DCD9CE] bg-[#E9FF32]/30 p-2.5",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "font-serif text-xs leading-relaxed text-[#111111]",
						children: [
							"“",
							q.text,
							"”"
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "mt-2 flex items-center justify-between gap-2 font-mono text-[10px] text-[#55534D]",
						children: [/* @__PURE__ */ jsx("span", {
							className: "truncate",
							children: q.articleTitle
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => deleteQuote(q.id),
							"aria-label": "Delete saved quote",
							className: "shrink-0 text-[#55534D] hover:text-[#FF3B6B]",
							children: /* @__PURE__ */ jsx(Trash2, { className: "h-3 w-3" })
						})]
					})]
				}, q.id))
			})]
		})
	] });
}
// src/components/islands/MeteredPaywall.tsx
var READS_STORAGE_KEY = "press09_reads_v1";
var MEMBER_STORAGE_KEY = "press09_member_v1";
var FREE_LIMIT = 2;
function getCookie(name) {
	const match = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));
	return match ? decodeURIComponent(match.split("=")[1]) : null;
}
function setCookie(name, value, maxAgeDays = 30) {
	document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeDays * 86400}; SameSite=Lax`;
}
function parseReadsList(raw) {
	if (!raw) return [];
	try {
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return raw.split(",").map((s) => s.trim()).filter(Boolean);
	}
}
function MeteredPaywall({ slug, initialMember, initialReads, sections }) {
	const [isMember, setIsMember] = useState(initialMember);
	const [reads, setReads] = useState(initialReads);
	const [locked, setLocked] = useState(false);
	const [unlocking, setUnlocking] = useState(false);
	const [justUnlocked, setJustUnlocked] = useState(false);
	useEffect(() => {
		const evaluateMeter = () => {
			const cookieMember = getCookie("press09_member") === "1";
			const storageMember = localStorage.getItem(MEMBER_STORAGE_KEY) === "1";
			const member = initialMember || cookieMember || storageMember;
			const cookieReads = parseReadsList(getCookie("press09_reads"));
			const storageReads = parseReadsList(localStorage.getItem(READS_STORAGE_KEY));
			const merged = Array.from(/* @__PURE__ */ new Set([
				...initialReads,
				...cookieReads,
				...storageReads
			]));
			if (member) {
				setIsMember(true);
				setReads(merged);
				setLocked(false);
				return;
			}
			if (merged.includes(slug)) {
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
	}, [
		slug,
		initialMember,
		initialReads
	]);
	const handleInstantUnlock = async () => {
		setUnlocking(true);
		try {
			await fetch("/api/unlock", { method: "POST" });
		} catch {}
		localStorage.setItem(MEMBER_STORAGE_KEY, "1");
		setCookie("press09_member", "1");
		setIsMember(true);
		setLocked(false);
		setUnlocking(false);
		setJustUnlocked(true);
		window.dispatchEvent(new CustomEvent("press09-meter-sync"));
	};
	const firstSection = sections[0];
	const previewParagraphs = firstSection ? firstSection.paragraphs.slice(0, 2) : [];
	const restFirstParagraphs = firstSection ? firstSection.paragraphs.slice(2) : [];
	const remainingSections = sections.slice(1);
	return /* @__PURE__ */ jsxs("div", {
		id: "essay-article-body",
		className: "essay-prose mt-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "mb-6 flex flex-wrap items-center justify-between gap-2 border border-[#DCD9CE] bg-[#ECEAE2]/65 px-3.5 py-2 font-mono text-[11px]",
				children: [isMember ? /* @__PURE__ */ jsxs("span", {
					className: "inline-flex items-center gap-1.5 font-semibold text-[#0038FF]",
					children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "h-3.5 w-3.5" }), "PATRON EDITION UNLOCKED · ALL ESSAYS OPEN"]
				}) : locked ? /* @__PURE__ */ jsxs("span", {
					className: "inline-flex items-center gap-1.5 font-semibold text-[#FF3B6B]",
					children: [/* @__PURE__ */ jsx(Lock, { className: "h-3.5 w-3.5" }), "FREE METER REACHED (2 / 2 FREE READS USED)"]
				}) : /* @__PURE__ */ jsxs("span", {
					className: "text-[#55534D]",
					children: [
						"FREE EDITION METER:",
						" ",
						/* @__PURE__ */ jsxs("strong", {
							className: "text-[#111111]",
							children: [
								Math.min(FREE_LIMIT, reads.length),
								" / ",
								FREE_LIMIT,
								" ARTICLES USED"
							]
						})
					]
				}), /* @__PURE__ */ jsx("span", {
					className: "text-[#55534D]",
					children: "UNCOATED RISO ARCHIVE"
				})]
			}),
			justUnlocked && /* @__PURE__ */ jsx("div", {
				role: "status",
				className: "mb-6 border border-[#0038FF] bg-[#0038FF]/8 px-4 py-2.5 font-mono text-xs font-medium text-[#0038FF]",
				children: "Patron Pass active — full essay unlocked instantaneously."
			}),
			/* @__PURE__ */ jsx("div", {
				className: "space-y-5 text-[#111111]",
				children: previewParagraphs.map((para, i) => /* @__PURE__ */ jsx("p", { children: para }, `lead-${i}`))
			}),
			locked ? /* @__PURE__ */ jsxs("div", {
				className: "relative mt-6",
				children: [/* @__PURE__ */ jsxs("div", {
					"aria-hidden": "true",
					className: "pointer-events-none select-none space-y-5 blur-[5px] opacity-45 max-h-40 overflow-hidden",
					children: [restFirstParagraphs.map((para, i) => /* @__PURE__ */ jsx("p", { children: para }, `blur-p-${i}`)), remainingSections[0]?.paragraphs.slice(0, 1).map((para, i) => /* @__PURE__ */ jsx("p", { children: para }, `blur-sec-${i}`))]
				}), /* @__PURE__ */ jsxs("div", {
					"data-testid": "soft-paywall-gate",
					className: "relative -mt-14 border-2 border-[#111111] bg-[#F7F6F2] p-6 sm:p-8 shadow-[0_14px_34px_rgba(17,17,17,0.12)]",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "inline-flex items-center gap-2 border border-[#FF3B6B] bg-[#FF3B6B]/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#FF3B6B]",
							children: [/* @__PURE__ */ jsx(Lock, { className: "h-3 w-3" }), "Issue 09 · Metered Reader Colophon"]
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "mt-4 font-display text-2xl sm:text-3xl font-bold leading-tight text-[#111111]",
							children: "You’ve read your 2 complimentary essays in Issue 09."
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-3 text-base leading-relaxed text-[#55534D]",
							children: "PRESS 09 is reader-funded without display advertising or programmatic tracking. Activate an instant Patron Pass to unlock all five long-form essays and sync your clippings archive."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-6 flex flex-wrap items-center gap-3",
							children: [/* @__PURE__ */ jsxs("button", {
								type: "button",
								disabled: unlocking,
								onClick: handleInstantUnlock,
								className: "inline-flex items-center gap-2 border-2 border-[#111111] bg-[#0038FF] px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#0029C7] transition-colors disabled:opacity-60",
								children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4 text-[#E9FF32]" }), unlocking ? "Activating Pass..." : "Instant Patron Unlock (Free Demo)"]
							}), /* @__PURE__ */ jsx("a", {
								href: "/",
								className: "border border-[#111111] bg-transparent px-4 py-3 font-mono text-xs font-medium text-[#111111] hover:bg-[#ECEAE2]",
								children: "Back to Issue Index"
							})]
						})
					]
				})]
			}) : /* @__PURE__ */ jsxs("div", {
				className: "mt-5 space-y-5 text-[#111111]",
				children: [restFirstParagraphs.map((para, i) => /* @__PURE__ */ jsx("p", { children: para }, `rest-${i}`)), remainingSections.map((sec, sIdx) => /* @__PURE__ */ jsxs("section", {
					className: "pt-4",
					children: [sec.heading && /* @__PURE__ */ jsx("h2", {
						className: "mb-3 font-display text-2xl font-bold tracking-tight text-[#111111]",
						children: sec.heading
					}), /* @__PURE__ */ jsx("div", {
						className: "space-y-5",
						children: sec.paragraphs.map((para, pIdx) => /* @__PURE__ */ jsx("p", { children: para }, `p-${sIdx}-${pIdx}`))
					})]
				}, `sec-${sIdx}`))]
			})
		]
	});
}
// src/pages/articles/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Slug = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const { slug } = Astro.params;
	const article = ZINE_ARTICLES.find((a) => a.slug === slug);
	if (!article) return Astro.redirect("/");
	const initialMember = Astro.cookies.get("press09_member")?.value === "1";
	const initialReads = (Astro.cookies.get("press09_reads")?.value ?? "").split(",").map((s) => decodeURIComponent(s).trim()).filter(Boolean);
	const otherArticles = ZINE_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 2);
	return renderTemplate`${renderComponent($$result, "ZineLayout", $$ZineLayout, {
		"title": `${article.title} — PRESS 09`,
		"description": article.dek
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "ReadingProgress", ReadingProgress, {
		"client:load": true,
		"readMinutes": article.readMinutes,
		"articleTitle": article.title,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Acer/jobjab/17-ui-template/05-indie-zine-paywall/src/components/islands/ReadingProgress.tsx",
		"client:component-export": "ReadingProgress"
	})}${maybeRenderHead($$result)}<article class="mx-auto max-w-[1180px] px-5 py-8 sm:py-10"><header class="grid grid-cols-1 gap-7 border-b-2 border-[#111111] pb-8 lg:grid-cols-12"><div class="flex flex-col justify-between lg:col-span-6"><div><div class="flex items-center justify-between font-mono text-[11px]"><span${addAttribute(renderTransition($$result, "jedada7n", "", `num-${article.slug}`), "data-astro-transition-scope")} class="bg-[#0038FF] px-2.5 py-0.5 font-semibold text-white">ESSAY ${article.index}</span><span class="text-[#55534D]">${article.topic} · ${article.date}</span></div><h1${addAttribute(renderTransition($$result, "l2afzzjx", "", `title-${article.slug}`), "data-astro-transition-scope")} class="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold leading-[1.04] tracking-tight text-[#111111]">${article.title}</h1><p class="mt-4 font-serif text-lg leading-relaxed text-[#55534D]">${article.dek}</p></div><div class="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-[#DCD9CE] pt-3 font-mono text-xs text-[#55534D]"><span>WORDS BY <strong class="text-[#111111]">${article.author.toUpperCase()}</strong> · ${article.city}</span><span>${article.readMinutes} MIN READ</span></div></div><div class="overflow-hidden border-2 border-[#111111] bg-[#ECEAE2] lg:col-span-6"><img${addAttribute(renderTransition($$result, "4up3fims", "", `cover-${article.slug}`), "data-astro-transition-scope")}${addAttribute(article.coverImage, "src")}${addAttribute(article.coverAlt, "alt")} class="aspect-[4/3] w-full object-cover"></div></header><div class="mx-auto mt-8 max-w-[68ch]">${renderComponent($$result, "ReaderToolbar", ReaderToolbar, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Acer/jobjab/17-ui-template/05-indie-zine-paywall/src/components/islands/ReaderToolbar.tsx",
		"client:component-export": "ReaderToolbar"
	})}${renderComponent($$result, "QuoteClipper", QuoteClipper, {
		"client:load": true,
		"articleSlug": article.slug,
		"articleTitle": article.title,
		"featuredPullQuote": article.pullQuote,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Acer/jobjab/17-ui-template/05-indie-zine-paywall/src/components/islands/QuoteClipper.tsx",
		"client:component-export": "QuoteClipper"
	})}${renderComponent($$result, "MeteredPaywall", MeteredPaywall, {
		"client:load": true,
		"slug": article.slug,
		"initialMember": initialMember,
		"initialReads": initialReads,
		"sections": article.sections,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Acer/jobjab/17-ui-template/05-indie-zine-paywall/src/components/islands/MeteredPaywall.tsx",
		"client:component-export": "MeteredPaywall"
	})}<nav aria-label="Next essays in Issue 09" class="mt-14 border-t-2 border-[#111111] pt-6"><div class="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#55534D]">Continue Issue 09</div><div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">${otherArticles.map((next) => renderTemplate`<a${addAttribute(`/articles/${next.slug}`, "href")} class="group border border-[#111111] bg-[#ECEAE2]/50 p-4 hover:border-[#0038FF] transition-colors"><span class="font-mono text-[10px] font-semibold text-[#FF3B6B]">ESSAY ${next.index} · ${next.topic}</span><div class="mt-1 font-display text-lg font-bold leading-snug text-[#111111] group-hover:text-[#0038FF]">${next.title}</div></a>`)}</div></nav></div></article>` })}`;
}, "C:/Users/Acer/jobjab/17-ui-template/05-indie-zine-paywall/src/pages/articles/[slug].astro", "self");
var $$file = "C:/Users/Acer/jobjab/17-ui-template/05-indie-zine-paywall/src/pages/articles/[slug].astro";
var $$url = "/articles/[slug]";
// \0virtual:astro:page:src/pages/articles/[slug]@_@astro
var page = () => _slug__exports;
export { page };
