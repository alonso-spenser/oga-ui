import type { App } from "vue";
import OgaAvatar from "./src/index.vue";

export default {
  install(app: App) {
    app.component("OgaAvatar", OgaAvatar);
  },
};
