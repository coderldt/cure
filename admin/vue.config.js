module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  productionSourceMap: false,
  devServer: {
    port: 9000,
    proxy: {
      "/cureApi": {
        target: "http://127.0.0.1:8000",
        // target: "https://litt.club",
        changeOrigin: true, // 是否跨域，虚拟的站点需要更管origin
      },
    },
  },
};
