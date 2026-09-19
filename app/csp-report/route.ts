// Receives Content-Security-Policy violation reports (report-uri / report-to)
// so the report-only policy is evaluated by Safari too and its findings are
// visible in the server log before the policy is enforced. Gift codes are
// bearer secrets, so any /gift/<code> or /g/<code> in a report is masked.
export async function POST(request: Request) {
  const length = Number(request.headers.get('content-length') ?? '0');
  if (length > 16_000) return new Response(null, { status: 413 });
  const body = await request.text().catch(() => '');
  console.warn('[csp-report]', body.slice(0, 2000).replace(/\/(gift|g)\/[A-Za-z0-9%-]{6,40}/gi, '/$1/…'));
  return new Response(null, { status: 204 });
}
