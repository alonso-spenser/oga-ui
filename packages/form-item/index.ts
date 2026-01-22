import type { App } from "vue";
import OgaFormItem from "./src/index.vue";

export default {
  install(app: App) {
    app.component("OgaFormItem", OgaFormItem);
  },
};
