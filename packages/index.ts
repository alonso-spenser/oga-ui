import type { App } from "vue";

import OgaInput from "./input/index";
import OgaInputTag from "./input/tag";
import PageSection from './section'
import OgaLayout from "./layout";
import OgaPage from "./page";
import OgaForm from "./form";
import OgaFormItem from "./form-item";
import OgaUnsaved from "./unsaved";
import OgaEditor from "./editor";
import OgaTable from "./table";
import OgaInputNumber from "./input/number";
import OgaMention from "./input/mention";
import OgaSelect from "./input/select";
import OgaSelectV2 from "./input/select-v2";
import OgaTimePicker from "./input/time-picker";
import OgaTimeSelect from "./input/time-select";
import OgaTreeSelect from "./input/tree-select";
import OgaCascader from "./input/cascader";
import OgaDatePicker from "./input/date-picker";
import OgaIcon from "./iconfont/index";
import OgaAvatar from "./avatar/index";
import OgaPaging from "./paging/index";
import ElIcon from "./icon/index";
import OgaImageUpload from "./image-upload/index";
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
  OgaInputNumber,
  OgaMention,
  OgaSelect,
  OgaSelectV2,
  OgaTimePicker,
  OgaTimeSelect,
  OgaTreeSelect,
  OgaCascader,
  OgaDatePicker,
  OgaIcon,
  OgaAvatar,
  OgaImageUpload,
  OgaPaging,
  ElIcon,
];

export default {
  install(app: App) {
    components.map((item) => app.use(item));
  },
};
