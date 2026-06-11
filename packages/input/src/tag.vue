<template>
  <div
      class="oga-material"
      :class="`${errorTips ?'' : ' no-tips'}`">
    <label
        class="oga-material-label"
    >{{ label }}</label>

    <el-input-tag
        v-bind="attrs"
        v-model="model"
        :class="round ? 'is-round' : ''"
        :placeholder="placeholder"
    >
      <template #tag v-if="useSlots().tag">
        <slot name="tag"></slot>
      </template>
      <template #default v-if="useSlots().default">
        <slot name="default"></slot>
      </template>
      <template #prefix v-if="useSlots().prefix">
        <slot name="prefix"></slot>
      </template>
      <template #suffix v-if="useSlots().suffix">
        <slot name="suffix"></slot>
      </template>
    </el-input-tag>
  </div>
</template>

<script lang="ts" setup>
import {useAttrs, useSlots} from 'vue'
defineOptions({
  inheritAttrs: false
})
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: ''
  },
  label: {
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
  },
  round: {
    type: Boolean,
    default: false
  }
})

/**
 * Use Attrs
 */
const attrs =  {
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
