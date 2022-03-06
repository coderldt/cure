import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store, { key } from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/assets/css/index.less";
import "@/assets/css/common.less";
import zhCn from "element-plus/es/locale/lang/zh-cn";

import globalCommonComponents from "@/components/globalCom/";
const app = createApp(App);

app.use(ElementPlus, {
  locale: zhCn,
  size: "small",
});

globalCommonComponents(app);
app.use(store).use(router).mount("#app");
