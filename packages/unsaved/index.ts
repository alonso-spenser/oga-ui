import type { App } from "vue";
import OgaUnsaved from "./src/index.vue";

export default {
  install(app: App) {
    app.component("OgaUnsaved", OgaUnsaved);
  },
};
