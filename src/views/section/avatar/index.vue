<template>
  <oga-page :offset="240" :percentage="100">
    <oga-avatar
      v-model="content"
      :action="action"
      :size="200"
      :radius="15"
    ></oga-avatar>
    {{ content }}
  </oga-page>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
const action = "http://127.0.0.1:9000/api/upload";
const content = ref("http://127.0.0.1:9000/file/2026792081640407041.webp");
onMounted(() => {});
</script>
