#!/usr/bin/env node
// Script that increases the version by 1 and makes a new git tag
const semver = require("semver");

const fs = require("fs");
const cp = require("child_process");

const package = JSON.parse(fs.readFileSync("package.json"));

const newVer = semver.parse(package.version).inc(process.argv[2] || "patch").version;

package.version = newVer;
fs.writeFile("package.json", JSON.stringify(package, null, "\t"), async () => {
    cp.spawnSync("npm", ["install"]);
    cp.spawnSync("git", ["commit", "-S", "-a", "-m", `v${newVer}`]);
    cp.spawnSync("git", ["tag", "-s", "-a", newVer, "-m", `v${newVer}`])
    cp.spawnSync("git", ["push", "--tags"])    
});