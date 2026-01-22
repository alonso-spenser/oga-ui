import type { App } from "vue";
import OgaForm from "./src/index.vue";

export default {
  install(app: App) {
    app.component("OgaForm", OgaForm);
  },
};
