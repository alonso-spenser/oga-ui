import type { App } from "vue";
import ElIcon from "./src/index.vue";

export default {
    install(app: App) {
        app.component("ElIcon", ElIcon);
    },
};
