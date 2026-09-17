// Receives Content-Security-Policy violation reports (report-uri / report-to)
// so the report-only policy is evaluated by Safari too and its findings are
// visible in the server log before the policy is enforced.
export async function POST(request: Request) {
  const body = await request.text().catch(() => '');
  console.warn('[csp-report]', body.slice(0, 2000));
  return new Response(null, { status: 204 });
}
