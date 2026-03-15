import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersistent from "pinia-plugin-persistedstate";

import elementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./assets/base.scss";
import "./assets/element.scss";
// import i18n from "./plugins/i18n/base";
import { InstallCodeMirror } from "codemirror-editor-vue3";
// import "./assets/iconfont/iconfont.js";

import ogaUi from "../packages";
import "../packages/style/index.scss";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();


app.use(router);
app.use(elementPlus);
// app.use(i18n);
app.use(InstallCodeMirror);
app.use(pinia);
app.use(ogaUi);
pinia.use(piniaPersistent);

app.mount("#app");
