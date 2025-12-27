import type { App } from "vue";
import OgaProgress from "./src/index.vue";

export default {
  install(app: App) {
    app.component("OgaProgress", OgaProgress);
  },
};
