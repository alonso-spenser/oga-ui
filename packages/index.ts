import type { App } from "vue";

import OgaInput from "./input";
import PageSection from './section'
import OgaLayout from "./layout";
import OgaPage from "./page";
import OgaForm from "./form";
import OgaFormItem from "./form-item";
import OgaUnsaved from "./unsaved";
import "./style/index.scss";
const components = [
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
