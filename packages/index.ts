import type { App } from "vue";
import OgaProgress from "./progress/index";
import OgaInput from "./input/index";

const components = [
  OgaProgress,
  OgaInput
];

export default {
  install(app: App) {
    components.map((item) => app.use(item));
  },
};
