import type { App } from "vue";
import OgaMention from "./src/mention.vue";

export default {
  install(app: App) {
    app.component("OgaMention", OgaMention);
  },
};
