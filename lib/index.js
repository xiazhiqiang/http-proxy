const fs = require("fs");
const path = require("path");
const spawn = require("cross-spawn");

const pwd = process.cwd();
const cwd = path.join(__dirname, "../");
const cwdBin = path.join(cwd, "./node_modules/.bin");

function run(params) {
  const { configPath, port, start = false, startConfigPath } = params;

  const HTTP_PROXY_TOOL_CONF =
    configPath && fs.existsSync(path.join(pwd, configPath))
      ? path.join(pwd, configPath)
      : path.join(cwd, "config/index.js");
  const HTTP_PROXY_TOOL_PORT = port && port != "3000" ? Number(port) : 3000;

  // 通过环境变量透传必要参数，可以思考用其他的方式
  if (start) {
    const args =
      startConfigPath && fs.existsSync(path.join(pwd, startConfigPath))
        ? ["--config", path.join(pwd, startConfigPath)]
        : [];
    spawn.sync(
      path.join(cwdBin, "cross-env"),
      [
        "HTTP_PROXY_TOOL_CONF=" + HTTP_PROXY_TOOL_CONF,
        "HTTP_PROXY_TOOL_PORT=" + HTTP_PROXY_TOOL_PORT,
        path.join(cwdBin, "nodemon"),
        path.join(cwd, "./lib/server.js"),
        ...args
      ],
      {
        stdio: "inherit"
      }
    );
  } else {
    spawn.sync(
      path.join(cwdBin, "cross-env"),
      [
        "HTTP_PROXY_TOOL_CONF=" + HTTP_PROXY_TOOL_CONF,
        "HTTP_PROXY_TOOL_PORT=" + HTTP_PROXY_TOOL_PORT,
        "node",
        path.join(cwd, "./lib/server.js")
      ],
      {
        stdio: "inherit"
      }
    );
  }
}

module.exports = {
  run
};
