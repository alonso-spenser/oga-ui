import type { App } from "vue";
import OgaTable from "./src/index.vue";

export default {
  install(app: App) {
    app.component("OgaTable", OgaTable);
  },
};
