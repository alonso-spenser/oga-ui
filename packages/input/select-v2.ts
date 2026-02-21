import type { App } from "vue";
import OgaSelectV2 from "./src/select-v2.vue";

export default {
  install(app: App) {
    app.component("OgaSelectV2", OgaSelectV2);
  },
};
