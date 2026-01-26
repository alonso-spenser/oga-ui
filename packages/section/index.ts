import type { App } from "vue";
import OgaSection from "./src/index.vue";

export default {
  install(app: App) {
    app.component("OgaSection", OgaSection);
  },
};
