import type { App } from "vue";

import OgaProgress from "./progress";
import OgaInput from "./input";

const components = [
  OgaProgress,
  OgaInput
];

export default {
  install(app: App) {
    components.map((item) => app.use(item));
  },
};
