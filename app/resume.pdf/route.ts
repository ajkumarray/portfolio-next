// Redirects /resume.pdf to the source URL (Google Drive or any public host).
// Using a redirect instead of a proxy means zero server-side fetch cost —
// the browser downloads the file directly from the source.
// Update RESUME_SOURCE_URL in Vercel env vars to swap the file without redeploying.

export const dynamic = "force-dynamic";

export async function GET() {
  const source = process.env.RESUME_SOURCE_URL;

  if (!source) {
    return new Response(
      "Résumé unavailable: RESUME_SOURCE_URL is not set on the server. " +
        "Add it in the hosting platform's environment variables and redeploy.",
      { status: 502, headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
  }

  return Response.redirect(source, 302);
}
