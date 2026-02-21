import type { App } from "vue";
import OgaTimeSelect from "./src/time-select.vue";

export default {
  install(app: App) {
    app.component("OgaTimeSelect", OgaTimeSelect);
  },
};
