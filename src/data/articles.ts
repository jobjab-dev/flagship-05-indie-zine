export interface ZineSection {
  heading?: string;
  paragraphs: string[];
}

export interface ZineArticle {
  slug: string;
  index: string;
  title: string;
  dek: string;
  author: string;
  city: string;
  date: string;
  readMinutes: number;
  topic: string;
  coverImage: string;
  coverAlt: string;
  pullQuote: string;
  sections: ZineSection[];
}

export const ZINE_ARTICLES: ZineArticle[] = [
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
      {
        paragraphs: [
          "Descend beneath Otemachi Station at 08:14 on a wet Tuesday and you enter a city inside a city—four stacked concrete strata threaded by thirty thousand hurried footsteps per minute. Yet nobody stops to squint at a legend.",
          "The genius of postwar Tokyo transit signage is neither ornamental minimalism nor rigid dogma. It is calibrated redundancy: color bands painted at eye height along ceramic wall tiles, numeric exit anchors stamped directly into poured pilasters, and arrows whose stem weight shifts slightly depending on viewing distance.",
          "Long before digital screens flattened wayfinding into backlit glass rectangles, municipal drafting offices treated ceramic grout lines and terrazzo floor joints as a physical grid system. Every directional turn was rehearsed with paper mockups taped to cardboard tunnels.",
        ],
      },
      {
        heading: "Tiled Thresholds and Spatial Compression",
        paragraphs: [
          "Where European metros leaned heavily on continuous enamel strips, Tokyo's rapid postwar expansions forced architects to join incompatible private lines mid-construction. Signage became structural stitchwork.",
          "Instead of hiding structural columns behind drywall, engineers wrapped load-bearing concrete ribs in matte mosaic tiles coded by line hue. When your peripheral vision registers warm amber ceramic shifting into deep cobalt, you feel the transfer before you parse a single kanji or Roman numeral.",
          "Modern software interfaces often forget this somatic layer of navigation. We strip margins, unify every surface into identical cards, and wonder why visitors feel unmoored inside deep hierarchies.",
        ],
      },
      {
        heading: "What Digital Typography Owes to Cast Concrete",
        paragraphs: [
          "Walk out toward Exit C13 and notice how lighting washes obliquely across ribbed concrete soffits. Shadows carve sharp typographic separation without adding a single pixel of border chrome.",
          "Editorial websites carry that same architectural obligation: clear entrance orientation, calm reading measure at roughly sixty-five characters, and decisive visual transitions when stepping from an issue index into long-form thought.",
        ],
      },
    ],
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
      {
        paragraphs: [
          "Across a quiet courtyard in Basel, a pair of quarter-inch Studer decks spin through fourteen inches per second of rust-brown polyester ribbon. Every subtle wow in transport speed bends harmonics in ways no linear plugin replicates convincingly.",
          "Musicians rarely return to magnetic tape out of vintage fetishism alone. They return because finite physical media imposes tempo on editing decisions. When cutting a loop requires masking tape and a demagnetized razor blade, hesitation melts into commitment.",
          "Digital audio workstations grant infinite undo stacks and microscopic surgical precision. Yet infinite optionality quietly erodes compositional nerve: tracks stay forever provisional, forever editable, rarely finished.",
        ],
      },
      {
        heading: "Hiss as Spatial Architecture",
        paragraphs: [
          "Tape noise is not flat digital static; it breathes around transient peaks. Soft saturation rounds aggressive upper harmonics into warm midrange density, letting drums and pads occupy adjacent frequencies without fighting.",
          "Even contemporary browser-based Web Audio synthesis learns from analog staging: gentle dynamics compression, subtle harmonic detuning, and resonant low-pass curves transform sterile mathematical sine waves into environments listeners inhabit for hours.",
        ],
      },
      {
        heading: "The Discipline of Finite Reels",
        paragraphs: [
          "When a reel hits its plastic leader and slaps freely against the deck, the session pauses naturally. You rewind, listen back end-to-end without staring at a waveform timeline, and hear the work as an audience hears it.",
        ],
      },
    ],
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
      {
        paragraphs: [
          "For nearly a decade, web font licensing resembled enterprise telemetry: pageview meters, domain verification scripts, and opaque annual seat renewals. Independent designers eventually grew exhausted paying rent on individual letterforms.",
          "Today's sharpest two-person foundries operate closer to independent record labels than software vendors. Releases ship alongside physical risograph specimen sheets, transparent perpetual studio tiers, and variable weight-and-width axes engineered explicitly for motion.",
          "Rather than polishing neutral geometric grotesques to vanishing invisibility, young type designers are embracing quirky ink traps, calligraphic serifs, and condensed Swiss headlines built to command narrow columns.",
        ],
      },
      {
        heading: "Ink Traps on High-DPI Glass",
        paragraphs: [
          "Originally carved into hot metal lead so thick ink wouldn't pool inside acute corners on porous newsprint, ink traps have returned on 5K OLED screens as pure expressive geometry.",
          "At 72 pixels, those deliberate wedges sharpen headline silhouettes and give editorial layouts immediate voice without relying on heavy drop shadows or decorative boxes.",
        ],
      },
      {
        heading: "Publishing as Living Specimen",
        paragraphs: [
          "Digital zines let foundries demonstrate faces in real reading conditions—complete with adjustable measure, responsive line-height, and interactive clipping—proving typography's resilience where readers actually spend time.",
        ],
      },
    ],
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
      {
        paragraphs: [
          "Wedged between a dry-cleaner and a two-meter pedestrian alley in Setagaya stands a four-story studio whose entire footprint fits inside a standard European parking bay.",
          "Instead of fighting zoning setbacks with defensive drywall, the design suspends exterior galvanized spiral stairs outside the thermal envelope, reclaiming interior square meters for double-height daylight shafts.",
          "From street level, overhead power cables frame the facade like ruled staff lines on sheet music—reminding passersby that dense urban fabric thrives through layering rather than erasure.",
        ],
      },
      {
        heading: "Structural Honesty at Micro Scale",
        paragraphs: [
          "In micro-buildings, concealed chases are unaffordable luxuries. Conduit runs exposed along brushed concrete ceilings; steel gusset plates remain visible beside cedar joinery.",
          "That same honesty applies to resilient web engineering: lean server-rendered documents shipped cleanly to the edge, waking interactive JavaScript islands strictly where the reader interacts.",
        ],
      },
      {
        heading: "Living Vertically Without Claustrophobia",
        paragraphs: [
          "Corner glazing angled forty-five degrees toward borrowed sky turns narrow alley shadows into shifting sundials across plain white plaster walls.",
        ],
      },
    ],
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
      {
        paragraphs: [
          "Feed uncoated cream cotton paper through a twin-drum Risograph RP3700 twice and minor mechanical misalignment becomes art direction. Stencil masters burn microscopic dots into soy ink that never fully seals into glossy plastic.",
          "Botanical researchers working in alpine field stations began printing compact quarterly herbaria after realizing proprietary digital asset platforms routinely vanish within five years.",
          "A physical booklet bound with two brass staples requires zero software runtime a century from now, yet its registration crosshairs and modular grids inspire the crispest digital reading rooms today.",
        ],
      },
      {
        heading: "Spot Color Discipline",
        paragraphs: [
          "When limited strictly to two spot inks plus paper white, visual hierarchy stops leaning on gradients. Contrast, scale, halftone density, and negative space do all the heavy lifting.",
          "On screen, preserving that print discipline yields quiet, breathless reading comfort—letting readers mark favorite quotes in vibrant citron highlighter and collect them across issues.",
        ],
      },
      {
        heading: "Slow Readers in Fast Feeds",
        paragraphs: [
          "A metered paywall need not bark like an ambush. Framed honestly as a reader-supported patronage colophon, it invites curious visitors to sample two essays freely before joining the print-and-web edition.",
        ],
      },
    ],
  },
];
