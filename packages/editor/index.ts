import type { App } from "vue";
import OgaEditor from "./src/index.vue";

export default {
  install(app: App) {
    app.component("OgaEditor", OgaEditor);
  },
};
