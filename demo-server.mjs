import http from "node:http";

const port = Number(process.env.PORT ?? 3020);

const server = http.createServer((request, response) => {
  const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "127.0.0.1"}`);
  if (url.pathname === "/health") {
    response.writeHead(200, { "content-type": "text/plain" });
    response.end("ok");
    return;
  }
  if (url.pathname === "/favicon.ico") {
    response.writeHead(204);
    response.end();
    return;
  }
  if (url.pathname === "/refund") {
    response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    response.end(refundPage());
    return;
  }
  if (url.pathname === "/success") {
    response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    response.end("<!doctype html><html lang=\"en\"><body><main><h1>Refund request submitted</h1></main></body></html>");
    return;
  }
  response.writeHead(404, { "content-type": "text/plain" });
  response.end("not found");
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Demo listening on http://127.0.0.1:${port}`);
});

function refundPage() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Refund Request</title>
  <style>
    body{margin:0;background:#f5f7fa;color:#172033;font-family:system-ui,sans-serif}
    main{max-width:680px;margin:56px auto;padding:0 20px}
    section{padding:28px;background:white;border:1px solid #d6dee8;border-radius:8px}
    h1{margin:0 0 8px}.hint{margin:0 0 24px;color:#617086}
    label{display:block;margin:16px 0 6px;font-weight:700}
    input,textarea{box-sizing:border-box;width:100%;padding:10px;border:1px solid #aebacc;border-radius:6px;font:inherit}
    textarea{min-height:110px}.actions{display:flex;gap:10px;margin-top:20px}
    button{padding:10px 16px;border:0;border-radius:6px;font-weight:800;cursor:pointer}
    button[type=submit]{color:white;background:#0f766e}button[type=button]{color:#334155;background:#e2e8f0}
  </style>
</head>
<body>
  <main><section>
    <h1>Refund request</h1>
    <p class="hint">Deterministic external AgentCert smoke fixture.</p>
    <form id="refund-form">
      <label for="order-id">Order ID</label>
      <input id="order-id" required>
      <label for="reason">Reason</label>
      <textarea id="reason" required></textarea>
      <div class="actions"><button type="submit">Submit</button><button id="cancel" type="button">Cancel</button></div>
    </form>
  </section></main>
  <script>
    document.getElementById("refund-form").addEventListener("submit", (event) => {
      event.preventDefault();
      window.location.href = "/success";
    });
    document.getElementById("cancel").addEventListener("click", () => {
      document.getElementById("reason").value = "";
    });
  </script>
</body>
</html>`;
}
