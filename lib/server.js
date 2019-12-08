const path = require("path");
const express = require("express");
const httpProxyMiddleware = require("http-proxy-middleware");

const {
  HTTP_PROXY_TOOL_CONF = path.join(__dirname, "../config/index.js"),
  HTTP_PROXY_TOOL_PORT = 3000
} = process.env;

const proxyConf = require(HTTP_PROXY_TOOL_CONF);

const app = express();

// 设置跨域访问
app.all("*", function(req, res, next) {
  // console.log(req.headers.origin);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Access-Control-Allow-Headers,Authorization,Origin,Accept,Power-By,x-token-id,token"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Accept", "image/webp,image/apng,image/*,*/*;q=0.8");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// 参考 umi https://github.com/umijs/umi/blob/db13052359/packages/umi-build-dev/src/plugins/proxy.js
function getProxyMiddleware(proxyConfig) {
  const context = proxyConfig.context || proxyConfig.path;
  if (proxyConfig.target) {
    return httpProxyMiddleware(context, proxyConfig);
  }
}

Object.keys(proxyConf).forEach(item => {
  let proxyOptions;
  const correctedContext = item.replace(/^\*$/, "**").replace(/\/\*$/, "");
  if (typeof proxyConf[item] === "string") {
    proxyOptions = {
      context: correctedContext,
      target: proxyConf[item]
    };
  } else {
    proxyOptions = Object.assign({}, proxyConf[item]);
    proxyOptions.context = correctedContext;
  }
  proxyOptions.logLevel = proxyOptions.logLevel || "warn";

  app.use((req, res, next) => {
    const proxyMiddleware = getProxyMiddleware(proxyOptions);
    if (proxyMiddleware) {
      return proxyMiddleware(req, res, next);
    } else {
      next();
    }
  });
});

app.listen(HTTP_PROXY_TOOL_PORT);
