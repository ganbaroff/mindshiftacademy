const fs = require("fs");

function fail(msg) {
  console.error("SMOKE FAIL:", msg);
  process.exit(1);
}

const html = fs.readFileSync("index.html", "utf8");
if (!html.includes("VOLAURA APP")) fail("Brand marker not found");
if (!html.includes("https://volaura.app")) fail("Volaura link missing");
if (html.includes("gemini.google.com")) fail("Legacy external AI URL still present");

const m = html.match(/<script>([\s\S]*)<\/script>/);
if (!m) fail("Inline script block not found");
const code = m[1];

const store = new Map();
const mk = (id = "") => ({
  id,
  style: { setProperty() {} },
  textContent: "",
  innerHTML: "",
  value: "",
  checked: false,
  files: null,
  appendChild() {},
  remove() {},
  click() {},
  setAttribute() {},
  classList: { toggle() {}, add() {}, remove() {} },
});
const map = new Map();
global.document = {
  body: mk("body"),
  documentElement: mk("html"),
  createElement: () => mk(),
  getElementById: (id) => {
    if (!map.has(id)) map.set(id, mk(id));
    return map.get(id);
  },
};
global.localStorage = {
  getItem: (k) => store.get(k) || null,
  setItem: (k, v) => store.set(k, String(v)),
};
global.window = { open() {}, scrollTo() {}, setTimeout, clearTimeout, setInterval, clearInterval };
global.navigator = { clipboard: { writeText: () => Promise.resolve() } };
global.confirm = () => true;
global.Blob = function Blob(parts) { this.parts = parts; };
global.URL = { createObjectURL: () => "blob:mock", revokeObjectURL: () => {} };
global.FileReader = function FileReader() {
  this.onload = null;
  this.readAsText = () => {
    if (this.onload) {
      this.result = "{}";
      this.onload();
    }
  };
};

new Function(code)();

const required = [
  "navigate",
  "startFocusSession",
  "stopFocusSession",
  "resetFocusSession",
  "createCertificate",
  "applySettings",
];
for (const fn of required) {
  if (typeof global.window[fn] !== "function") fail(`Missing export: ${fn}`);
}

console.log("SMOKE PASS");
