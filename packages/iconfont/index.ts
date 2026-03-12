import type { App } from "vue";
import OgaIcon from "./src/index.vue";

export default {
    install(app: App) {
        app.component("OgaIcon", OgaIcon);
    },
};
