<template>
  <div
      class="oga-material"
      :class="`${errorTips ?'' : ' no-tips'}`">
    <label
        class="oga-material-label"
    >{{ label }}</label>
    <el-tree-select
        v-bind="attrs"
        v-model="model"
        :class="round ? 'is-round' : ''"
        :placeholder="placeholder"
    >
    </el-tree-select>
  </div>
</template>

<script lang="ts" setup>
import { defineModel, useAttrs, useSlots } from 'vue'
defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  errorTips: {
    type: Boolean,
    default: true
  },
  round: {
    type: Boolean,
    default: false
  }
})

/**
 * Use Attrs
 */
const attrs = {
  ...useAttrs()
}

/**
 * default value
 */
const model = defineModel()
</script>

<style lang="scss" scoped>
@import url("../../style/index.scss");
</style>
