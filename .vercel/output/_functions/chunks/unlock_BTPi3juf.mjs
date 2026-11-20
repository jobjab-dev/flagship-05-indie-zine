import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
// src/pages/api/unlock.ts
var unlock_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ cookies }) => {
	cookies.set("press09_member", "1", {
		path: "/",
		maxAge: 2592e3,
		httpOnly: false,
		sameSite: "lax"
	});
	return new Response(JSON.stringify({
		ok: true,
		member: true,
		message: "PRESS 09 Patron Pass activated."
	}), {
		status: 200,
		headers: { "Content-Type": "application/json" }
	});
};
var DELETE = async ({ cookies }) => {
	cookies.delete("press09_member", { path: "/" });
	cookies.delete("press09_reads", { path: "/" });
	return new Response(JSON.stringify({
		ok: true,
		member: false,
		reads: [],
		message: "Metered paywall cookies reset."
	}), {
		status: 200,
		headers: { "Content-Type": "application/json" }
	});
};
// \0virtual:astro:page:src/pages/api/unlock@_@ts
var page = () => unlock_exports;
export { page };
