// lastUpdate.js
const fs = require("fs");
const { execSync } = require("child_process");

// Get the last commit date + time in ISO format
const commitDate = execSync("git log -1 --format=%cd --date=iso").toString().trim();

// Optional: format to something nicer if you want (e.g., '18 Apr 2025, 14:42')
const formatted = new Date(commitDate).toLocaleString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

// Write to file
fs.writeFileSync("./src/lastUpdate.ts", `export const lastUpdate = "${formatted}";\n`);
