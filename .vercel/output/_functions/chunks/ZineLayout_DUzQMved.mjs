import { K as AstroError, h as InvalidComponentArgs } from "./errors-data_Bu7LYtXB.mjs";
import { f as renderHead, g as addAttribute, i as renderComponent, p as createRenderInstruction, s as renderSlot, u as renderTemplate } from "./server_D2qI1hjZ.mjs";
import { t as createAstro } from "./compiler_BSbyAmI3.mjs";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Eraser, Lock, RotateCcw, SlidersHorizontal, X } from "lucide-react";
// node_modules/@astrojs/runtime/dist/internal/server/astro-component.js
function validateArgs(args) {
	if (args.length !== 3) return false;
	if (!args[0] || typeof args[0] !== "object") return false;
	return true;
}
function baseCreateComponent(cb, moduleId, propagation) {
	const name = moduleId?.split("/").pop()?.replace(".astro", "") ?? "";
	const fn = (...args) => {
		if (!validateArgs(args)) throw new AstroError({
			...InvalidComponentArgs,
			message: InvalidComponentArgs.message(name)
		});
		return cb(...args);
	};
	Object.defineProperty(fn, "name", {
		value: name,
		writable: false
	});
	fn.isAstroComponentFactory = true;
	fn.moduleId = moduleId;
	fn.propagation = propagation;
	return fn;
}
function createComponentWithOptions(opts) {
	return baseCreateComponent(opts.factory, opts.moduleId, opts.propagation);
}
function createComponent(arg1, moduleId, propagation) {
	if (typeof arg1 === "function") return baseCreateComponent(arg1, moduleId, propagation);
	else return createComponentWithOptions(arg1);
}
// node_modules/@astrojs/runtime/dist/internal/server/render/script.js
/**
* Relies on the `renderScript: true` compiler option
* @experimental
*/
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
// node_modules/astro/components/ClientRouter.astro
createAstro("https://astro.build");
var $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ClientRouter;
	const { fallback = "animate" } = Astro.props;
	return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "C:/Users/Acer/jobjab/17-ui-template/05-indie-zine-paywall/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Acer/jobjab/17-ui-template/05-indie-zine-paywall/node_modules/astro/components/ClientRouter.astro", void 0);
// src/components/islands/MeterStatusBadge.tsx
function MeterStatusBadge() {
	const [label, setLabel] = useState("2 FREE READS / ISSUE");
	useEffect(() => {
		const refresh = () => {
			if (localStorage.getItem("press09_member_v1") === "1" || document.cookie.includes("press09_member=1")) {
				setLabel("PATRON PASS · UNLOCKED");
				return;
			}
			try {
				const raw = localStorage.getItem("press09_reads_v1");
				const arr = raw ? JSON.parse(raw) : [];
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
	return /* @__PURE__ */ jsx("span", {
		className: "border border-[#0038FF]/30 bg-[#0038FF]/8 px-2.5 py-1 font-mono text-[10px] font-semibold text-[#0038FF] tabular-nums",
		children: label
	});
}
// src/data/articles.ts
var ZINE_ARTICLES = [
	{
		slug: "subterranean-concrete-wayfinding",
		index: "01",
		title: "Subterranean Concrete & The Grammar of Civic Wayfinding",
		dek: "How Tokyo's tiled transfer corridors turned brutalist engineering into one of the fastest legible civic interfaces on earth.",
		author: "Renata Mizuno",
		city: "Tokyo / Zurich",
		date: "ISSUE 09 · NOV 2026",
		readMinutes: 6,
		topic: "CIVIC SYSTEMS",
		coverImage: "/images/zine-01-brutalist-transit.jpg",
		coverAlt: "Risograph architectural illustration of Tokyo concrete transit arches in cobalt and coral",
		pullQuote: "A commuter moving at five kilometers per hour does not read sentences; they read contrast ratios, directional kerning, and architectural rhythm.",
		sections: [
			{ paragraphs: [
				"Descend beneath Otemachi Station at 08:14 on a wet Tuesday and you enter a city inside a city—four stacked concrete strata threaded by thirty thousand hurried footsteps per minute. Yet nobody stops to squint at a legend.",
				"The genius of postwar Tokyo transit signage is neither ornamental minimalism nor rigid dogma. It is calibrated redundancy: color bands painted at eye height along ceramic wall tiles, numeric exit anchors stamped directly into poured pilasters, and arrows whose stem weight shifts slightly depending on viewing distance.",
				"Long before digital screens flattened wayfinding into backlit glass rectangles, municipal drafting offices treated ceramic grout lines and terrazzo floor joints as a physical grid system. Every directional turn was rehearsed with paper mockups taped to cardboard tunnels."
			] },
			{
				heading: "Tiled Thresholds and Spatial Compression",
				paragraphs: [
					"Where European metros leaned heavily on continuous enamel strips, Tokyo's rapid postwar expansions forced architects to join incompatible private lines mid-construction. Signage became structural stitchwork.",
					"Instead of hiding structural columns behind drywall, engineers wrapped load-bearing concrete ribs in matte mosaic tiles coded by line hue. When your peripheral vision registers warm amber ceramic shifting into deep cobalt, you feel the transfer before you parse a single kanji or Roman numeral.",
					"Modern software interfaces often forget this somatic layer of navigation. We strip margins, unify every surface into identical cards, and wonder why visitors feel unmoored inside deep hierarchies."
				]
			},
			{
				heading: "What Digital Typography Owes to Cast Concrete",
				paragraphs: ["Walk out toward Exit C13 and notice how lighting washes obliquely across ribbed concrete soffits. Shadows carve sharp typographic separation without adding a single pixel of border chrome.", "Editorial websites carry that same architectural obligation: clear entrance orientation, calm reading measure at roughly sixty-five characters, and decisive visual transitions when stepping from an issue index into long-form thought."]
			}
		]
	},
	{
		slug: "magnetic-tape-friction-and-memory",
		index: "02",
		title: "Oxide Grain: Why Magnetic Tape Refuses to Disappear",
		dek: "Inside boutique mastering rooms where physical inertia, bias noise, and razor-blade splices still shape contemporary electronic music.",
		author: "Lukas Haldimann",
		city: "Basel",
		date: "ISSUE 09 · NOV 2026",
		readMinutes: 5,
		topic: "ACOUSTICS",
		coverImage: "/images/zine-02-analog-tape.jpg",
		coverAlt: "Risograph print of open-reel analog magnetic tape spools and acoustic wave lines",
		pullQuote: "Lossless perfection has zero resistance; tape asks the composer to commit before the oxide passes the erase head.",
		sections: [
			{ paragraphs: [
				"Across a quiet courtyard in Basel, a pair of quarter-inch Studer decks spin through fourteen inches per second of rust-brown polyester ribbon. Every subtle wow in transport speed bends harmonics in ways no linear plugin replicates convincingly.",
				"Musicians rarely return to magnetic tape out of vintage fetishism alone. They return because finite physical media imposes tempo on editing decisions. When cutting a loop requires masking tape and a demagnetized razor blade, hesitation melts into commitment.",
				"Digital audio workstations grant infinite undo stacks and microscopic surgical precision. Yet infinite optionality quietly erodes compositional nerve: tracks stay forever provisional, forever editable, rarely finished."
			] },
			{
				heading: "Hiss as Spatial Architecture",
				paragraphs: ["Tape noise is not flat digital static; it breathes around transient peaks. Soft saturation rounds aggressive upper harmonics into warm midrange density, letting drums and pads occupy adjacent frequencies without fighting.", "Even contemporary browser-based Web Audio synthesis learns from analog staging: gentle dynamics compression, subtle harmonic detuning, and resonant low-pass curves transform sterile mathematical sine waves into environments listeners inhabit for hours."]
			},
			{
				heading: "The Discipline of Finite Reels",
				paragraphs: ["When a reel hits its plastic leader and slaps freely against the deck, the session pauses naturally. You rewind, listen back end-to-end without staring at a waveform timeline, and hear the work as an audience hears it."]
			}
		]
	},
	{
		slug: "indie-type-foundries-post-subscription",
		index: "03",
		title: "Small Metal & Variable Axes: Independent Type After Subscriptions",
		dek: "A new wave of micro-foundries is abandoning SaaS licensing trackers in favor of perpetual print-inspired Specimen Zines.",
		author: "Mei-Ling Sato",
		city: "Osaka / Berlin",
		date: "ISSUE 09 · NOV 2026",
		readMinutes: 7,
		topic: "TYPOGRAPHY",
		coverImage: "/images/zine-03-type-foundry.jpg",
		coverAlt: "Risograph isometric illustration of letterpress foundry blocks and ink rollers",
		pullQuote: "Every great display face begins as an argument against polite neutrality.",
		sections: [
			{ paragraphs: [
				"For nearly a decade, web font licensing resembled enterprise telemetry: pageview meters, domain verification scripts, and opaque annual seat renewals. Independent designers eventually grew exhausted paying rent on individual letterforms.",
				"Today's sharpest two-person foundries operate closer to independent record labels than software vendors. Releases ship alongside physical risograph specimen sheets, transparent perpetual studio tiers, and variable weight-and-width axes engineered explicitly for motion.",
				"Rather than polishing neutral geometric grotesques to vanishing invisibility, young type designers are embracing quirky ink traps, calligraphic serifs, and condensed Swiss headlines built to command narrow columns."
			] },
			{
				heading: "Ink Traps on High-DPI Glass",
				paragraphs: ["Originally carved into hot metal lead so thick ink wouldn't pool inside acute corners on porous newsprint, ink traps have returned on 5K OLED screens as pure expressive geometry.", "At 72 pixels, those deliberate wedges sharpen headline silhouettes and give editorial layouts immediate voice without relying on heavy drop shadows or decorative boxes."]
			},
			{
				heading: "Publishing as Living Specimen",
				paragraphs: ["Digital zines let foundries demonstrate faces in real reading conditions—complete with adjustable measure, responsive line-height, and interactive clipping—proving typography's resilience where readers actually spend time."]
			}
		]
	},
	{
		slug: "vertical-micro-cabins-and-utility-lines",
		index: "04",
		title: "Between Utility Wires: Micro-Architecture on 18-Square-Meter Plots",
		dek: "Architects in dense wards are stacking steel-frame studios into leftover triangular parcels once dismissed as unbuildable.",
		author: "Kenji Morimoto",
		city: "Shimokitazawa",
		date: "ISSUE 09 · NOV 2026",
		readMinutes: 6,
		topic: "ARCHITECTURE",
		coverImage: "/images/zine-04-micro-architecture.jpg",
		coverAlt: "Risograph print of stacked Japanese concrete micro-cabin modules with spiral stairs",
		pullQuote: "Tightness sharpens proportion; when a stair tread doubles as a bookshelf, every millimeter becomes civic theater.",
		sections: [
			{ paragraphs: [
				"Wedged between a dry-cleaner and a two-meter pedestrian alley in Setagaya stands a four-story studio whose entire footprint fits inside a standard European parking bay.",
				"Instead of fighting zoning setbacks with defensive drywall, the design suspends exterior galvanized spiral stairs outside the thermal envelope, reclaiming interior square meters for double-height daylight shafts.",
				"From street level, overhead power cables frame the facade like ruled staff lines on sheet music—reminding passersby that dense urban fabric thrives through layering rather than erasure."
			] },
			{
				heading: "Structural Honesty at Micro Scale",
				paragraphs: ["In micro-buildings, concealed chases are unaffordable luxuries. Conduit runs exposed along brushed concrete ceilings; steel gusset plates remain visible beside cedar joinery.", "That same honesty applies to resilient web engineering: lean server-rendered documents shipped cleanly to the edge, waking interactive JavaScript islands strictly where the reader interacts."]
			},
			{
				heading: "Living Vertically Without Claustrophobia",
				paragraphs: ["Corner glazing angled forty-five degrees toward borrowed sky turns narrow alley shadows into shifting sundials across plain white plaster walls."]
			}
		]
	},
	{
		slug: "risograph-herbarium-of-synthetic-flora",
		index: "05",
		title: "Halftone Herbarium: Printing Botanical Memory in Two Spot Inks",
		dek: "Why biologists and printmakers are collaborating on soy-ink field zines that outlast fragile cloud archives.",
		author: "Clara Vetter",
		city: "Zurich",
		date: "ISSUE 09 · NOV 2026",
		readMinutes: 5,
		topic: "PRINT ECOLOGY",
		coverImage: "/images/zine-05-synthetic-botany.jpg",
		coverAlt: "Risograph botanical specimen plate of pressed fern over geometric grid circles",
		pullQuote: "Two spot drums—electric cobalt and fluorescent coral—reveal textures four-color CMYK flattens into mud.",
		sections: [
			{ paragraphs: [
				"Feed uncoated cream cotton paper through a twin-drum Risograph RP3700 twice and minor mechanical misalignment becomes art direction. Stencil masters burn microscopic dots into soy ink that never fully seals into glossy plastic.",
				"Botanical researchers working in alpine field stations began printing compact quarterly herbaria after realizing proprietary digital asset platforms routinely vanish within five years.",
				"A physical booklet bound with two brass staples requires zero software runtime a century from now, yet its registration crosshairs and modular grids inspire the crispest digital reading rooms today."
			] },
			{
				heading: "Spot Color Discipline",
				paragraphs: ["When limited strictly to two spot inks plus paper white, visual hierarchy stops leaning on gradients. Contrast, scale, halftone density, and negative space do all the heavy lifting.", "On screen, preserving that print discipline yields quiet, breathless reading comfort—letting readers mark favorite quotes in vibrant citron highlighter and collect them across issues."]
			},
			{
				heading: "Slow Readers in Fast Feeds",
				paragraphs: ["A metered paywall need not bark like an ambush. Framed honestly as a reader-supported patronage colophon, it invites curious visitors to sample two essays freely before joining the print-and-web edition."]
			}
		]
	}
];
// src/components/islands/QaDrawer.tsx
function QaDrawer() {
	const [open, setOpen] = useState(false);
	const [readsCount, setReadsCount] = useState(0);
	const [member, setMember] = useState(false);
	const syncFromBrowser = () => {
		try {
			const rawReads = localStorage.getItem("press09_reads_v1");
			const parsed = rawReads ? JSON.parse(rawReads) : [];
			setReadsCount(Array.isArray(parsed) ? parsed.length : 0);
			setMember(localStorage.getItem("press09_member_v1") === "1" || document.cookie.includes("press09_member=1"));
		} catch {}
	};
	useEffect(() => {
		syncFromBrowser();
		window.addEventListener("press09-meter-sync", syncFromBrowser);
		return () => window.removeEventListener("press09-meter-sync", syncFromBrowser);
	}, []);
	const handleSimulateTwoReads = async () => {
		try {
			await fetch("/api/unlock", { method: "DELETE" });
		} catch {}
		const twoSlugs = ZINE_ARTICLES.slice(0, 2).map((a) => a.slug);
		localStorage.setItem("press09_reads_v1", JSON.stringify(twoSlugs));
		localStorage.removeItem("press09_member_v1");
		document.cookie = `press09_reads=${encodeURIComponent(twoSlugs.join(","))}; path=/; max-age=2592000; SameSite=Lax`;
		document.cookie = "press09_member=; path=/; max-age=0";
		syncFromBrowser();
		window.dispatchEvent(new CustomEvent("press09-meter-sync"));
	};
	const handleResetPaywall = async () => {
		try {
			await fetch("/api/unlock", { method: "DELETE" });
		} catch {}
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
	return /* @__PURE__ */ jsx("div", {
		className: "fixed bottom-4 left-4 z-40",
		children: open ? /* @__PURE__ */ jsxs("div", {
			className: "w-[295px] border-2 border-[#111111] bg-[#F7F6F2] p-3.5 text-[#111111] shadow-[0_14px_34px_rgba(17,17,17,0.16)]",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between border-b border-[#DCD9CE] pb-2",
					children: [/* @__PURE__ */ jsx("span", {
						className: "font-mono text-[11px] font-semibold uppercase tracking-wider text-[#0038FF]",
						children: "Showcase / QA Zine"
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setOpen(false),
						"aria-label": "Close Showcase / QA drawer",
						className: "p-1 text-[#55534D] hover:text-[#111111]",
						children: /* @__PURE__ */ jsx(X, { className: "h-3.5 w-3.5" })
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-2.5 flex justify-between bg-[#ECEAE2] px-2.5 py-1.5 font-mono text-[10px]",
					children: [/* @__PURE__ */ jsxs("span", { children: [
						"Reads: ",
						readsCount,
						"/2"
					] }), /* @__PURE__ */ jsx("span", {
						className: member ? "text-[#0038FF] font-semibold" : "text-[#FF3B6B] font-semibold",
						children: member ? "PATRON PASS" : "METERED"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-2.5 flex flex-col gap-1.5",
					children: [
						/* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: handleSimulateTwoReads,
							className: "flex items-center justify-between border border-[#DCD9CE] bg-white px-2.5 py-2 text-left font-mono text-[11px] hover:border-[#FF3B6B]",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "inline-flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(Lock, { className: "h-3.5 w-3.5 text-[#FF3B6B]" }), "Prefill 2 Reads Used"]
							}), /* @__PURE__ */ jsx("span", {
								className: "text-[10px] text-[#55534D]",
								children: "WALL NEXT"
							})]
						}),
						/* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: handleResetPaywall,
							className: "flex items-center justify-between border border-[#DCD9CE] bg-white px-2.5 py-2 text-left font-mono text-[11px] hover:border-[#0038FF]",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "inline-flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(RotateCcw, { className: "h-3.5 w-3.5 text-[#0038FF]" }), "Reset Meter & Cookies"]
							}), /* @__PURE__ */ jsx("span", {
								className: "text-[10px] text-[#55534D]",
								children: "0/2"
							})]
						}),
						/* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: handleClearClippings,
							className: "flex items-center justify-between border border-[#DCD9CE] bg-white px-2.5 py-2 text-left font-mono text-[11px] hover:border-[#111111]",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "inline-flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(Eraser, { className: "h-3.5 w-3.5 text-[#55534D]" }), "Clear Saved Clippings"]
							}), /* @__PURE__ */ jsx("span", {
								className: "text-[10px] text-[#55534D]",
								children: "QUOTES"
							})]
						})
					]
				})
			]
		}) : /* @__PURE__ */ jsxs("button", {
			type: "button",
			onClick: () => setOpen(true),
			className: "inline-flex items-center gap-2 rounded-full border border-[#111111] bg-[#F7F6F2]/95 px-3.5 py-1.5 font-mono text-[11px] font-medium text-[#111111] shadow-[0_4px_12px_rgba(17,17,17,0.1)] hover:border-[#0038FF]",
			children: [/* @__PURE__ */ jsx(SlidersHorizontal, { className: "h-3.5 w-3.5 text-[#0038FF]" }), "Showcase / QA"]
		})
	});
}
// src/layouts/ZineLayout.astro
createAstro("https://astro.build");
var $$ZineLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ZineLayout;
	const { title, description = "PRESS 09 — Independent Tokyo & Zurich Risograph Digital Culture Zine" } = Astro.props;
	return renderTemplate`<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"${addAttribute(description, "content")}><link rel="icon" href="data:image/svg+xml,&lt;svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'&gt;&lt;rect width='32' height='32' fill='%230038FF'/&gt;&lt;circle cx='16' cy='16' r='7' fill='%23E9FF32'/&gt;&lt;/svg&gt;"><title>${title}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700;800&family=Martian+Mono:wght@400;500;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;1,8..60,400&display=swap" rel="stylesheet">${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead($$result)}</head><body class="min-h-screen flex flex-col bg-[#F7F6F2] text-[#111111]"><header class="border-b-2 border-[#111111] bg-[#F7F6F2]"><div class="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 px-5 py-3.5"><a href="/" class="flex items-baseline gap-3 group"><span class="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0038FF] group-hover:text-[#FF3B6B] transition-colors">PRESS 09</span><span class="hidden sm:inline font-mono text-[11px] uppercase tracking-wider text-[#55534D]">TOKYO / ZURICH RISOGRAPH EDITION</span></a><div class="flex items-center gap-3">${renderComponent($$result, "MeterStatusBadge", MeterStatusBadge, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Acer/jobjab/17-ui-template/05-indie-zine-paywall/src/components/islands/MeterStatusBadge.tsx",
		"client:component-export": "MeterStatusBadge"
	})}<a href="/" class="border border-[#111111] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider hover:bg-[#111111] hover:text-[#E9FF32] transition-colors">Issue Index</a></div></div></header><div class="flex-1">${renderSlot($$result, $$slots["default"])}</div><footer class="mt-12 border-t-2 border-[#111111] bg-[#ECEAE2]/70 px-5 py-4"><div class="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-[#55534D]"><span>PRESS 09 · ASTRO SSR VIEW TRANSITIONS + REACT ISLANDS + METERED PAYWALL</span><span>Crafted by${" "}<a href="https://github.com/jobjab-dev" target="_blank" rel="noreferrer" class="text-[#0038FF] underline underline-offset-4 hover:text-[#111111]">jobjab-dev</a></span></div></footer>${renderComponent($$result, "QaDrawer", QaDrawer, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Acer/jobjab/17-ui-template/05-indie-zine-paywall/src/components/islands/QaDrawer.tsx",
		"client:component-export": "QaDrawer"
	})}</body></html>`;
}, "C:/Users/Acer/jobjab/17-ui-template/05-indie-zine-paywall/src/layouts/ZineLayout.astro", void 0);
export { ZINE_ARTICLES as n, createComponent as r, $$ZineLayout as t };
