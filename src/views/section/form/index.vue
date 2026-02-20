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
          label="Quantity"
          round
          :options="options"
          size="large"
          placeholder="Please enter your qty"
          autocomplete="off"
        ></oga-mention>
      </el-form-item>
      <el-form-item prop="mt">
        {{ selectValue }}
        <!--        <el-select-->
        <!--            v-model="selectValue"-->
        <!--            value-key="id"-->
        <!--            placeholder="Select"-->
        <!--            style="width: 240px"-->
        <!--        >-->
        <!--          <el-option-->
        <!--              v-for="item in selectOptions"-->
        <!--              :key="item.id"-->
        <!--              :label="item.label"-->
        <!--              :value="item"-->
        <!--          />-->
        <!--        </el-select>-->

        <oga-select
          v-model="selectValue"
          label="Quantity"
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
          label="Quantity"
          :min="1"
          :max="10"
          round
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
          label="Password"
          placeholder="Please enter your password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item prop="checkPass">
        <oga-input
          v-model="ruleForm.checkPass"
          type="password"
          label="Confirm"
          :error-tips="false"
          placeholder="Please enter your confirm password"
        ></oga-input>
      </el-form-item>

      <el-form-item prop="age">
        <oga-input
          clearable
          v-model="ruleForm.age"
          size="large"
          label="Age"
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
      @confirmed="formValidation"
    ></oga-unsaved>
  </oga-page>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { ElementPlus, Search } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from "element-plus";

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
const selectValue = ref<SelectOption>();
const selectOptions = ref([
  { id: 1, label: "Option A", desc: "Option A - 230506" },
  { id: 2, label: "Option B", desc: "Option B - 230506" },
  { id: 3, label: "Option C", desc: "Option C - 230506" },
  { id: 4, label: "Option A", desc: "Option A - 230507" },
]);

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
  selectValue: {},
});

const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: "blur" }],
  checkPass: [{ validator: validatePass2, trigger: "blur" }],
  // age: [{ validator: checkAge, trigger: 'blur' }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log(ruleForm);
      console.log("submit!");
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
