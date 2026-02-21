import type { App } from "vue";
import OgaTreeSelect from "./src/tree-select.vue";

export default {
  install(app: App) {
    app.component("OgaTreeSelect", OgaTreeSelect);
  },
};
