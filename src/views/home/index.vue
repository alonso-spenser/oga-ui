<template>
  <oga-page
      :offset="300"
      :percentage="100"
  >
    <template #header>
      <div  style="background: #67C23A">
        slot="header"
      </div>
    </template>
    HOME INDEX
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
    <div style="background: #f2f2f2;height: 3000px"></div>
    <template #footer>
      <div  style="background: #3a75c2">
        slot="footer"
      </div>
    </template>
  </oga-page>
</template>
<script setup lang="ts">
import { ref } from "vue";
const input = ref("joe@google.com");
import { Calendar, Search } from "@element-plus/icons-vue";

const changeLocale = () => {
  // console.log(input.value);
};
</script>
