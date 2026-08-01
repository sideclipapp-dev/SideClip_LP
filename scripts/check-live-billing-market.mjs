const BILLING_MARKET_URL = "https://sideclip-billing.sideclip-app.workers.dev/api/billing-market?client=sideclip-lp";
const expectedArgument = process.argv.find((argument) => argument.startsWith("--expected-market="));
const expectedMarket = expectedArgument?.split("=")[1] || "";

if (expectedMarket && !["jp", "global"].includes(expectedMarket)) {
  throw new Error("--expected-market must be jp or global.");
}

const response = await fetch(BILLING_MARKET_URL, {
  headers: { Accept: "application/json" }
});

if (!response.ok) {
  throw new Error(`Billing market API returned HTTP ${response.status}.`);
}

const data = await response.json();
const expectedCurrency = data.billing_market === "jp" ? "JPY" : data.billing_market === "global" ? "USD" : "";
if (!expectedCurrency || data.billing_currency !== expectedCurrency) {
  throw new Error(`Invalid market/currency pair: ${data.billing_market}/${data.billing_currency}.`);
}
if (expectedMarket && data.billing_market !== expectedMarket) {
  throw new Error(`Expected ${expectedMarket}, but the live endpoint resolved ${data.billing_market}.`);
}
if (!data.billing_country || !data.billing_country_source) {
  throw new Error("Live response is missing country-resolution metadata.");
}

for (const key of ["pro_monthly", "pro_yearly", "ultra_monthly", "ultra_yearly"]) {
  const item = data.prices?.[key];
  if (!item || item.currency !== expectedCurrency || !Number.isFinite(Number(item.amount_minor)) || Number(item.amount_minor) <= 0) {
    throw new Error(`Live response has an invalid ${key} price.`);
  }
}

console.log([
  "Live billing market check passed.",
  `market=${data.billing_market}`,
  `currency=${data.billing_currency}`,
  `country=${data.billing_country}`,
  `source=${data.billing_country_source}`
].join(" "));
