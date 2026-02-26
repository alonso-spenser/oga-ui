import type { App } from "vue";
import OgaImageUpload from "./src/index.vue";

export default {
  install(app: App) {
    app.component("OgaImageUpload", OgaImageUpload);
  },
};
