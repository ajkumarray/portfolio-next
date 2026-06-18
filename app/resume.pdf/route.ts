// Serves the résumé PDF from an external S3/CloudFront source at a clean
// same-origin path (/resume.pdf). Implemented as a force-dynamic route fetched
// with `no-store` so the file can be updated by re-uploading to S3 WITHOUT a
// redeploy — no build-time rewrite, no pinned/cached proxy, no static fallback
// to go stale. The source URL comes from RESUME_SOURCE_URL.

export const dynamic = "force-dynamic";

const FILENAME = "Ajit_Kumar_Resume.pdf";

const plain = (body: string, status: number) =>
  new Response(body, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });

export async function GET() {
  const source = process.env.RESUME_SOURCE_URL;

  if (!source) {
    return plain(
      "Résumé unavailable: RESUME_SOURCE_URL is not set on the server. " +
        "Add it in the hosting platform's environment variables and redeploy.",
      502,
    );
  }

  let upstream: Response;
  try {
    upstream = await fetch(source, { cache: "no-store" });
  } catch (err) {
    return plain(`Résumé unavailable: could not reach the source. ${String(err)}`, 502);
  }

  if (!upstream.ok || !upstream.body) {
    return plain(`Résumé unavailable: source responded ${upstream.status}.`, 502);
  }

  // Stream the upstream body straight through.
  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${FILENAME}"`,
      "Cache-Control": "public, max-age=300, must-revalidate",
    },
  });
}
