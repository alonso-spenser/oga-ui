import type { App } from "vue";
import OgProgress from "./src/index.vue";

export default {
  install(app: App) {
    app.component("OgProgress", OgProgress);
  },
};
