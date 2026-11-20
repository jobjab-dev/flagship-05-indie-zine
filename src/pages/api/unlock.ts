import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ cookies }) => {
  cookies.set("press09_member", "1", {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: false,
    sameSite: "lax",
  });

  return new Response(
    JSON.stringify({
      ok: true,
      member: true,
      message: "PRESS 09 Patron Pass activated.",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const DELETE: APIRoute = async ({ cookies }) => {
  cookies.delete("press09_member", { path: "/" });
  cookies.delete("press09_reads", { path: "/" });

  return new Response(
    JSON.stringify({
      ok: true,
      member: false,
      reads: [],
      message: "Metered paywall cookies reset.",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};
