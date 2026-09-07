const verificationHtml = `<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>
    <body>Verification: 2765f0ede41c596e</body>
</html>`;

export function GET() {
  return new Response(verificationHtml, {
    headers: {
      'content-type': 'text/plain; charset=UTF-8',
      'cache-control': 'public, max-age=0, must-revalidate',
    },
  });
}
