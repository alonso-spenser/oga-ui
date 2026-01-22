import type { App } from "vue";
import OgaPageSection from "./src/index.vue";

export default {
  install(app: App) {
    app.component("OgaPageSection", OgaPageSection);
  },
};
