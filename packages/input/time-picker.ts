import type { App } from "vue";
import OgaTimePicker from "./src/time-picker.vue";

export default {
  install(app: App) {
    app.component("OgaTimePicker", OgaTimePicker);
  },
};
