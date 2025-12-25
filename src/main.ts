import { createApp } from "vue";
import { createPinia } from "pinia";
/**
 * 全局引入未打包组件
 */
import ogUI from "@/components";
/**
 * 全局引入打包组件
 */
// import ogUI from "../m-ui/index.mjs";
// import "../m-ui/style.css";
/**
 * 单一引入某一打包组件
 */
// import mForm from "../m-ui/form/index.mjs";
// import "../m-ui/form/style.css";

import App from "./App.vue";
import router from "./router";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia())
    .use(router)
    .use(ElementPlus)
    .use(ogUI)
    .mount("#app");
