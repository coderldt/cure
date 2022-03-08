module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  productionSourceMap: false,
  devServer: {
    proxy: {
      "/cureApi": {
        // target: "http://127.0.0.1:7001",
        target: "https://litt.club",
        changeOrigin: true, // 是否跨域，虚拟的站点需要更管origin
      },
    },
  },
};
