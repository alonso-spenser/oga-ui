import type { App } from "vue";
// @ts-ignore
import OgInput from "./src/index.vue";

export default {
  install(app: App) {
    app.component("OgInput", OgInput);
  },
};
