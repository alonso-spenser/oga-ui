import type { App } from "vue";
import OgProgress from "./progress/index";
import OgInput from "./input/index";

const components = [
  OgProgress,
  OgInput
];

export default {
  install(app: App) {
    components.map((item) => app.use(item));
  },
};
