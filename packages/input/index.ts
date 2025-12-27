import type { App } from "vue";
import OgaInput from "./src/index.vue";

export default {
  install(app: App) {
    app.component("OgaInput", OgaInput);
  },
};
