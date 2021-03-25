const fs = require("fs");
const path = require("path");
const cwd = process.cwd();

const files = [
    "notifier.js",
    "notifier.js.map",
    "notify.js",
    "notify.js.map",
    "notify.min.mjs",
    "snackbar-component.js",
    "snackbar-component.js.map",
    "toast-component.js",
    "toast-component.js.map",
    "notifier.d.ts",
    "notify.d.ts",
    "snackbar-component.d.ts",
    "toast-component.d.ts",
    "types.d.ts",
    "notify.min.js",
];

function normalizePath(file){
    return path.join(cwd, file);
}

for (let i = 0; i < files.length; i++){
    const path = normalizePath(files[i]);
    if (fs.existsSync(path)){
        fs.unlinkSync(path);
    }
}