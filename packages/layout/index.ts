import type { App } from "vue";
import OgaLayout from "./src/index.vue";

export default {
  install(app: App) {
    app.component("OgaLayout", OgaLayout);
  },
};
