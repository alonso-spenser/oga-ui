<template>
  <oga-page :offset="240" :percentage="100">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      class="oga-form gutter-less"
    >
      <el-form-item prop="mt">
        <oga-mention
          v-model="ruleForm.mt"
          label="Mention(@)"
          round
          :options="options"
          size="large"
          placeholder="Please enter your qty"
          autocomplete="off"
        ></oga-mention>
      </el-form-item>
      <el-form-item prop="mt">
        <oga-select
          v-model="ruleForm.selectValue"
          label="Select"
          value-key="id"
          round
          size="large"
          placeholder="Please enter your qty"
        >
          <el-option
            v-for="item in selectOptions"
            :key="item.id"
            :label="item.label"
            :value="item"
          ></el-option>
        </oga-select>
      </el-form-item>
      <el-form-item prop="mt">
        <oga-select
            v-model="ruleForm.v2"
            label="Select V2"
            value-key="id"
            round
            size="large"
            placeholder="Please enter your qty"
        >
          <el-option
              v-for="item in selectOptions"
              :key="item.id"
              :label="item.label"
              :value="item"
          ></el-option>
        </oga-select>
      </el-form-item>
      <el-form-item prop="qty">
        <oga-input-number
          v-model="ruleForm.qty"
          label="Input Number"
          :min="1"
          :max="10"
          round
          size="large"
          placeholder="Please enter your qty"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item prop="tm">
        <oga-time-picker
            v-model="ruleForm.tm"
            label="Time Picker"
            round
            size="large"
            placeholder="Please enter your qty"
            autocomplete="off"
        />
      </el-form-item>
      <el-form-item prop="ts">
        <oga-time-select
            v-model="ruleForm.ts"
            label="Time Select"
            round
            size="large"
            start="08:30"
            step="00:15"
            end="18:30"
            placeholder="Please enter your qty"
            autocomplete="off"
        />
      </el-form-item>
      <el-form-item prop="dt">
        <oga-date-picker
            v-model="ruleForm.dt"
            label="Data Picker"
            round
            size="large"
            type="daterange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            :disabled-date="disabledDate"
            :shortcuts="dataShortcuts"
            placeholder="Please enter your qty"
            autocomplete="off"
        />
      </el-form-item>
      <el-form-item prop="ts">
        <oga-tree-select
            v-model="ruleForm.treeSelect"
            label="Tree Select"
            round
            :data="treeSelectData"
            :render-after-expand="false"
            multiple
            size="large"
            placeholder="Please enter your qty"
            autocomplete="off"
        />
      </el-form-item>
      <el-form-item prop="cs">
        <oga-cascader
            v-model="ruleForm.cs"
            label="Cascader"
            round
            :options="cascaderOptions"
            :props="cascaderProps"
            size="large"
            placeholder="Please enter your qty"
            autocomplete="off"
        />
      </el-form-item>
      <el-form-item prop="pass">
        <oga-input
          v-model="ruleForm.pass"
          type="password"
          size="small"
          label="Input Password"
          placeholder="Please enter your password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item prop="checkPass">
        <oga-input
          v-model="ruleForm.checkPass"
          type="password"
          label="Input"
          :error-tips="false"
          placeholder="Please enter your confirm password"
        ></oga-input>
      </el-form-item>

      <el-form-item prop="age">
        <oga-input
          clearable
          v-model="ruleForm.age"
          size="large"
          label="Input"
          round
          placeholder="Please enter your Age"
        ></oga-input>
      </el-form-item>

      <el-form-item prop="tags">
        <oga-input-tag
          label="Tag"
          size="large"
          round
          placeholder="Please enter your tag"
          v-model="ruleForm.tags"
          clearable
        >
          <template #prefix>
            <el-icon><ElementPlus /></el-icon>
          </template>
          <template #suffix>
            <el-icon><Search /></el-icon>
          </template>
        </oga-input-tag>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Submit
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>

    <div style="height: 1000px"></div>
    <oga-unsaved
      :unsaved.sync="unsaved"
      :loading="loading"
      offset="300px"
      round
      @cancel="closeDialog"
      @confirmed="submitForm(ruleFormRef)"
    ></oga-unsaved>
  </oga-page>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { ElementPlus, Search } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from "element-plus";
import number from "../../../../packages/input/number.ts";

const loading = false;
let unsaved = ref(false);

const ruleFormRef = ref<FormInstance>();
const options = ref([
  {
    label: "Fuphoenixes",
    value: "Fuphoenixes",
  },
  {
    label: "kooriookami",
    value: "kooriookami",
  },
  {
    label: "Jeremy",
    value: "Jeremy",
  },
  {
    label: "btea",
    value: "btea",
  },
]);

type SelectOption = {
  id: number;
  label: string;
  desc: string;
};
const selectOptions = ref([
  { id: 1, label: "Option A", desc: "Option A - 230506" },
  { id: 2, label: "Option B", desc: "Option B - 230506" },
  { id: 3, label: "Option C", desc: "Option C - 230506" },
  { id: 4, label: "Option A", desc: "Option A - 230507" },
]);

const cascaderProps = {
  expandTrigger: 'hover' as const,
}
const cascaderOptions = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout',
          },
          {
            value: 'color',
            label: 'Color',
          },
          {
            value: 'typography',
            label: 'Typography',
          },
          {
            value: 'icon',
            label: 'Icon',
          },
          {
            value: 'button',
            label: 'Button',
          },
        ],
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio',
          },
          {
            value: 'checkbox',
            label: 'Checkbox',
          },
          {
            value: 'input',
            label: 'Input',
          },
          {
            value: 'input-number',
            label: 'InputNumber',
          },
          {
            value: 'select',
            label: 'Select',
          },
          {
            value: 'cascader',
            label: 'Cascader',
          },
          {
            value: 'switch',
            label: 'Switch',
          },
          {
            value: 'slider',
            label: 'Slider',
          },
          {
            value: 'time-picker',
            label: 'TimePicker',
          },
          {
            value: 'date-picker',
            label: 'DatePicker',
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker',
          },
          {
            value: 'upload',
            label: 'Upload',
          },
          {
            value: 'rate',
            label: 'Rate',
          },
          {
            value: 'form',
            label: 'Form',
          },
        ],
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table',
          },
          {
            value: 'tag',
            label: 'Tag',
          },
          {
            value: 'progress',
            label: 'Progress',
          },
          {
            value: 'tree',
            label: 'Tree',
          },
          {
            value: 'pagination',
            label: 'Pagination',
          },
          {
            value: 'badge',
            label: 'Badge',
          },
        ],
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert',
          },
          {
            value: 'loading',
            label: 'Loading',
          },
          {
            value: 'message',
            label: 'Message',
          },
          {
            value: 'message-box',
            label: 'MessageBox',
          },
          {
            value: 'notification',
            label: 'Notification',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu',
          },
          {
            value: 'tabs',
            label: 'Tabs',
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb',
          },
          {
            value: 'dropdown',
            label: 'Dropdown',
          },
          {
            value: 'steps',
            label: 'Steps',
          },
        ],
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog',
          },
          {
            value: 'tooltip',
            label: 'Tooltip',
          },
          {
            value: 'popover',
            label: 'Popover',
          },
          {
            value: 'card',
            label: 'Card',
          },
          {
            value: 'carousel',
            label: 'Carousel',
          },
          {
            value: 'collapse',
            label: 'Collapse',
          },
        ],
      },
    ],
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components',
      },
      {
        value: 'sketch',
        label: 'Sketch Templates',
      },
      {
        value: 'docs',
        label: 'Design Documentation',
      },
    ],
  },
]

const treeSelectData = [
  {
    value: '1',
    label: 'Level one 1',
    children: [
      {
        value: '1-1',
        label: 'Level two 1-1',
        children: [
          {
            value: '1-1-1',
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: 'Level one 2',
    children: [
      {
        value: '2-1',
        label: 'Level two 2-1',
        children: [
          {
            value: '2-1-1',
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        value: '2-2',
        label: 'Level two 2-2',
        children: [
          {
            value: '2-2-1',
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    value: '3',
    label: 'Level one 3',
    children: [
      {
        value: '3-1',
        label: 'Level two 3-1',
        children: [
          {
            value: '3-1-1',
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        value: '3-2',
        label: 'Level two 3-2',
        children: [
          {
            value: '3-2-1',
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
]
const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("Please input the age"));
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error("Please input digits"));
    } else {
      if (value < 18) {
        callback(new Error("Age must be greater than 18"));
      } else {
        callback();
      }
    }
  }, 1000);
};

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  } else {
    if (ruleForm.checkPass !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass");
    }
    callback();
  }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password again"));
  } else if (value !== ruleForm.pass) {
    callback(new Error("Two inputs don't match!"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  pass: "admin@2026",
  checkPass: "admin@2026",
  age: "24",
  tags: ["111", "222"],
  qty: 0,
  mt: "",
  selectValue: null,
  v2: null,
  tm: null,
  ts: null,
  treeSelect: null,
  cs: null,
  dt: null,
});

const dataShortcuts = [
  {
    text: 'Today',
    value: new Date(),
  },
  {
    text: 'Yesterday',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    },
  },
  {
    text: 'A week ago',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    },
  },
]

const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}

const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: "blur" }],
  checkPass: [{ validator: validatePass2, trigger: "blur" }],
  // age: [{ validator: checkAge, trigger: 'blur' }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log(JSON.stringify(ruleForm));
    } else {
      console.log("error submit!");
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const closeDialog = () => {
  unsaved.value = false;
};

const formValidation = () => {};

watch(
  ruleForm,
  (newVal, oldVal) => {
    unsaved.value = true;
  },
  { deep: true },
);
</script>

<style scoped lang="scss"></style>
