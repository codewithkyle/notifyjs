const fs = require("fs");
const path = require("path");
const cwd = process.cwd();

fs.rmSync(path.join(cwd, "dist"), { recursive: true, force: true });
