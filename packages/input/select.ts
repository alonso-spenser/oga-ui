import type { App } from "vue";
import OgaSelect from "./src/select.vue";

export default {
  install(app: App) {
    app.component("OgaSelect", OgaSelect);
  },
};
