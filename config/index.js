module.exports = {
  // demo 天气接口代理
  "/api/weather/city": {
    target: "http://t.weather.sojson.com/api/weather/city",
    changeOrigin: true
  }
};
