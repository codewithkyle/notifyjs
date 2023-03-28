import fs from "fs";
import path from "path";

const cwd = process.cwd();

fs.rmSync(path.join(cwd, "dist"), { recursive: true, force: true });
