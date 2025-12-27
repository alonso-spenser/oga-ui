<template>
  <div class="start-page">
    <div style="margin: 100px">
      <oga-input
        shrink
        placeholder="Email"
        size="large"
        v-model="input"
        @input="changeLocale"
        :prefix-icon="Search"
        description="Please enter Date Of Birth"
      >
        <template #prepend> $ </template>
        <template #append> CMD </template>
        <template #suffix>
          <el-icon class="el-input__icon"><calendar /></el-icon>
        </template>
      </oga-input>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const input = ref("joe@google.com");
import { Calendar, Search } from "@element-plus/icons-vue";

const changeLocale = () => {
  // console.log(input.value);
};
</script>
