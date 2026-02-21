import type { App } from "vue";
import OgaCascader from "./src/cascader.vue";

export default {
  install(app: App) {
    app.component("OgaCascader", OgaCascader);
  },
};
