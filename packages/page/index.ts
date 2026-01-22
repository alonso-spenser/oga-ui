import type { App } from "vue";
import OgaPage from "./src/index.vue";

export default {
  install(app: App) {
    app.component("OgaPage", OgaPage);
  },
};
