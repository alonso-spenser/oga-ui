import type { App } from "vue";
import OgaInputTag from "./src/tag.vue";

export default {
  install(app: App) {
    app.component("OgaInputTag", OgaInputTag);
  },
};
