<template>
  <div class="start-page">
    <div style="margin: 100px">
      <el-input
        v-model="input"
        style="width: 240px"
        placeholder="Please input"
      />
      <oga-input></oga-input>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ArrowRightBold } from "@element-plus/icons-vue";
const input = ref("11");
</script>
