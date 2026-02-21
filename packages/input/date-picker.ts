import type { App } from "vue";
import OgaDatePicker from "./src/date-picker.vue";

export default {
  install(app: App) {
    app.component("OgaDatePicker", OgaDatePicker);
  },
};
