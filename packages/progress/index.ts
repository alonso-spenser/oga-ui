import type { App } from "vue";
// @ts-ignore
import OgaProgress from "./src/index.vue";

export default {
  install(app: App) {
    app.component("OgaProgress", OgaProgress);
  },
};
