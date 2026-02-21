// import { App, Plugin } from 'vue';
// import getIcon from './getIcon';
//
// const IconPlugin: Plugin = {
//     install(app: App, options: any = {}) {
//         const tagName = options.tag || 'icon'
//         if (!app.component(tagName)) {
//             app.component(tagName, getIcon(options))
//         }
//     }
// }
//
// export default IconPlugin

import type { App } from "vue";
import OgaIcon from "./src/iconFont.vue";

export default {
    install(app: App) {
        app.component("OgaIcon", OgaIcon);
    },
};
