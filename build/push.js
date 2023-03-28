#!/usr/bin/env node
let name = process.argv[2] || "Auto-commit";
let chalk = require("chalk"); // 2.4.2
let shell = require("shelljs"); // 0.8.5
let { exec, echo, exit, cd, which } = shell;

cd("../");

if (!which("git")) {
  echo(chalk.bold.red("请检查本机git命令"));
  exit(1);
}

if (exec("git pull").code !== 0) {
  echo(chalk.bold.red("Error: Git pull failed"));
  exit(1);
}
if (exec("git add .").code !== 0) {
  echo(chalk.bold.red("Error: Git add failed"));
  exit(1);
}

if (exec("git status").code !== 0) {
  echo(chalk.bold.red("Error: Git status failed"));
  exit(1);
}
if (exec(`git commit -am "${name}"`).code !== 0) {
  echo(chalk.bold.red("Error: Git commit failed"));
  exit(1);
}
if (exec("git push").code !== 0) {
  echo(chalk.bold.red("Error: Git push failed"));
  exit(1);
}
echo(chalk.bold.blue(`git success ${name}`));
