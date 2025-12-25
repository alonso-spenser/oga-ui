<template>
  <div class="demo-progress">
    <el-input placeholder="fuck you"></el-input>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, PropType } from 'vue'
import type { inputProps } from './types';

const activated = ref(false)
const props = defineProps({
  value: {
    type: [String, Number],
    default: '2'
  },
  placeholder: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  borderless: {
    type: String,
    default: false
  },
  shrink: {
    type: String,
    default: false
  },
  errorTips: {
    type: String,
    default: true
  }
})

onMounted(() => {

})

</script>

<style lang="scss" scoped>
@import url("../../style/var.scss");
</style>
