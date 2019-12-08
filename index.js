#! /usr/bin/env node

const program = require("commander");
const pkg = require("./package.json");
const action = require("./lib/index");

program
  .version(pkg.version)
  .option("-c, --config-path [configPath]", "代理配置文件路径", "")
  .option("-p, --port [port]", "启动服务端口", 3000)
  .option("-s, --start [start]", "需要nodemon启动", false)
  .option("-C, --start-config-path [startConfigPath]", "nodemon配置文件", "")
  .parse(process.argv);

program.on("--help", function() {
  program.help();
});

action.run(program);
