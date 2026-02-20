import type { App } from "vue";
import OgaInputNumber from "./src/input-number.vue";

export default {
  install(app: App) {
    app.component("OgaInputNumber", OgaInputNumber);
  },
};
