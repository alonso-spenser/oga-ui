import type { App } from "vue";

import OgaInput from "./input/index.ts";
import OgaInputTag from "./input/tag.ts";
import PageSection from './section'
import OgaLayout from "./layout";
import OgaPage from "./page";
import OgaForm from "./form";
import OgaFormItem from "./form-item";
import OgaUnsaved from "./unsaved";
import OgaEditor from "./editor";
import OgaTable from "./table";
import "./style/index.scss";
const components = [
  OgaInput,
  PageSection,
  OgaLayout,
  OgaPage,
  OgaForm,
  OgaFormItem,
  OgaUnsaved,
  OgaInputTag,
  OgaEditor,
  OgaTable,
];

export default {
  install(app: App) {
    components.map((item) => app.use(item));
  },
};
