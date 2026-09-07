const verificationHtml = `<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  </head>
  <body>Verification: 3fbc0b3b849863b0</body>
</html>`;

export function GET() {
  return new Response(verificationHtml, {
    headers: {
      'content-type': 'text/plain; charset=UTF-8',
      'cache-control': 'public, max-age=0, must-revalidate',
    },
  });
}
