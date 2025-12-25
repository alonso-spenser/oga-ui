<template>
  <div
      class="el-input-material"
      :class="`${borderless ? 'borderless' : ''}${errorTips ?'' : ' no-tips'}`">
    <label
        v-if="!borderless"
        class="el-input-material-label"
        :class="shrink || activated ? 'active' : ''">{{ placeholder }}</label>
    <el-input
        v-bind="attrs"
        v-model="defaultValue"
        :placeholder="shrink ? description || '' : placeholder"
    >
      <template #append v-if="useSlots().append">
        <slot name="append"></slot>
      </template>
      <template #prepend v-if="useSlots().prepend">
        <slot name="prepend"></slot>
      </template>
      <template #prepend v-if="useSlots().default">
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
import { ref, onMounted, useAttrs, useSlots } from 'vue'
import type { inputProps } from './types';

let defaultValue = ''
const activated = ref(false)
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
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
    type: Boolean,
    default: false
  },
  shrink: {
    type: Boolean,
    default: true
  },
  errorTips: {
    type: Boolean,
    default: true
  }
})

let attrs = useAttrs()

attrs = {
  ...attrs,
  ...props
}

//初始化
onMounted(() => {
  defaultValue = props.modelValue;

});
</script>

<style lang="scss" scoped>
@import url("../../style/var.scss");
</style>
