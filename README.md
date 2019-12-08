# http-proxy

- 小而美的 http 代理请求工具
- 可以解决一些请求跨域问题

## 用法

```
# 指定代理配置
hproxy -c ./proxy/config.js

# 指定代理配置文件，并开启nodemon
hproxy -c ./proxy/config.js -s true

# 指定代理配置文件，并开启nodemon及指定nodemon配置
hproxy -c ./proxy/config.js -s true -C ./proxy/nodemon.json
```

## 代理配置示例

```
module.exports = {
  // demo 天气接口代理
  "/api/weather/city": {
    target: "http://t.weather.sojson.com/api/weather/city",
    changeOrigin: true
  }
};
```
