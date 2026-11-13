// Scheduled closure (Asia/Taipei, UTC+8): closed from 2026-11-17 00:00
// through 2026-11-29 23:59:59; reopens automatically 2026-11-30 00:00.
// Runs on Cloudflare before any file is served, so no content leaks while closed.
const CLOSE_START = Date.parse("2026-11-17T00:00:00+08:00");
const CLOSE_END = Date.parse("2026-11-30T00:00:00+08:00");

const PAGE = `<!doctype html>
<html lang="zh-Hant-TW">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>網站暫停開放</title>
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center;
         font-family: -apple-system, BlinkMacSystemFont, "PingFang TC", "Noto Sans TC", sans-serif;
         background: #f5f7fb; color: #1d2a44; padding: 16px; box-sizing: border-box; }
  main { max-width: 480px; text-align: center; line-height: 1.8; }
  h1 { font-size: 1.6rem; margin: 0 0 .5em; }
  p { font-size: 1.15rem; margin: 0; }
</style>
</head>
<body>
<main>
  <h1>網站暫停開放</h1>
  <p>本網站於 2026 年 11 月 17 日至 11 月 29 日暫停開放，<br>將於 11 月 30 日恢復。</p>
</main>
</body>
</html>`;

export async function onRequest(context) {
  const now = Date.now();
  if (now >= CLOSE_START && now < CLOSE_END) {
    return new Response(PAGE, {
      status: 503,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store",
        "x-robots-tag": "noindex",
        "retry-after": new Date(CLOSE_END).toUTCString(),
      },
    });
  }
  return context.next();
}
