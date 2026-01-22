<template>
  <oga-page
      :offset="300"
      :percentage="100"
  >
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        class="oga-form gutter-less"
    >
      <el-form-item prop="pass">
        <oga-input
            v-model="ruleForm.pass" t
            type="password"
            size="small"
            placeholder="Password"
            description="Please enter your password"
            autocomplete="off" />
      </el-form-item>
      <el-form-item prop="checkPass">
        <oga-input
            v-model="ruleForm.checkPass" t
            type="password"
            placeholder="Confirm"
            description="Please enter your confirm password"
           ></oga-input>
      </el-form-item>

      <el-form-item prop="age">
        <oga-input
            clearable
            v-model="ruleForm.age"
            placeholder="Age"
            size="large"
            description="Please enter your Age"
           ></oga-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Submit
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
    <oga-unsaved
        :unsaved.sync="unsaved"
        :loading="loading"
        offset="300px"
        @cancel="closeDialog"
        @confirmed="formValidation"
    ></oga-unsaved>
  </oga-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

import type { FormInstance, FormRules } from 'element-plus'

const loading = false
const unsaved = true

const ruleFormRef = ref<FormInstance>()

const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input the age'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Please input digits'))
    } else {
      if (value < 18) {
        callback(new Error('Age must be greater than 18'))
      } else {
        callback()
      }
    }
  }, 1000)
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass')
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  pass: '',
  checkPass: '',
  age: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  age: [{ validator: checkAge, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const closeDialog = () => {
  console.log('close')
}

const formValidation = () => {
  console.log('formValidation')
}
</script>

<style scoped lang="scss">

</style>