import type { App } from "vue";
import OgProgress from "./progress/index";

const components = [
  OgProgress
];

export default {
  install(app: App) {
    components.map((item) => app.use(item));
  },
};
