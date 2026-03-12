import type { App } from "vue";
import OgaPaging from "./src/index.vue";

export default {
  install(app: App) {
    app.component("OgaPaging", OgaPaging);
  },
};
