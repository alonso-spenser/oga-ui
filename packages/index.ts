import type { App } from "vue";

import OgaProgress from "./progress";
import OgaInput from "./input";
import PageSection from './page-section'
import OgaLayout from "./layout";
import OgaPage from "./page";
import OgaForm from "./form";
import OgaFormItem from "./form-item";
import OgaUnsaved from "./unsaved";

const components = [
  OgaProgress,
  OgaInput,
  PageSection,
  OgaLayout,
  OgaPage,
  OgaForm,
  OgaFormItem,
  OgaUnsaved
];

export default {
  install(app: App) {
    components.map((item) => app.use(item));
  },
};
