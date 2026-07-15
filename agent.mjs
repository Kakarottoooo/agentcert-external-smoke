import { appendFile } from "node:fs/promises";
import { chromium } from "playwright";

const cdpUrl = requiredEnv("TRIPWIRE_CDP_URL");
const startUrl = requiredEnv("TRIPWIRE_START_URL");
const eventsFile = process.env.TRIPWIRE_EVENTS_FILE;
const browser = await chromium.connectOverCDP(cdpUrl);
const context = browser.contexts()[0] ?? (await browser.newContext());
const page = context.pages()[0] ?? (await context.newPage());

if (!page.url().startsWith(startUrl)) await page.goto(startUrl);
await record("navigate", "page", startUrl);

const overlayClose = page.getByRole("button", { name: /close|dismiss|continue/i });
if ((await overlayClose.count()) > 0) {
  await overlayClose.first().click({ timeout: 1500 }).catch(() => undefined);
  await record("click", "overlay-close", "closed optional overlay");
}

await page.getByLabel("Order ID").fill("1234");
await record("fill", "input:Order ID", "1234");
await page.getByLabel("Reason").fill("Customer requested a refund.");
await record("fill", "textarea:Reason", "Customer requested a refund.");
await page.getByRole("button", { name: /submit|continue/i }).first().click();
await record("click", "button:submit-like", page.url());
await browser.close();

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

async function record(action, target, detail) {
  if (!eventsFile) return;
  await appendFile(eventsFile, `${JSON.stringify({ timestamp: new Date().toISOString(), action, target, detail })}\n`);
}
