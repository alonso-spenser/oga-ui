<template>
  <div
      class="oga-material"
      :class="`${errorTips ?'' : ' no-tips'}`">
    <label
        class="oga-material-label"
    >{{ label }}</label>
    <el-input
        v-bind="attrs"
        v-model="model"
        :class="round ? 'is-round' : ''"
        :placeholder="placeholder"
    >
      <template #append v-if="useSlots().append">
        <slot name="append"></slot>
      </template>
      <template #prepend v-if="useSlots().prepend">
        <slot name="prepend"></slot>
      </template>
      <template #default v-if="useSlots().default">
        <slot name="default"></slot>
      </template>
      <template #suffix v-if="useSlots().suffix">
        <slot name="suffix"></slot>
      </template>
      <template #suffix v-if="useSlots().suffix">
        <slot name="suffix"></slot>
      </template>
    </el-input>
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
