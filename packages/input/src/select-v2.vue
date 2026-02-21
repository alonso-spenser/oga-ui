<template>
  <div
      class="oga-material"
      :class="`${errorTips ?'' : ' no-tips'}`">
    <label
        class="oga-material-label"
    >{{ label }}</label>
    <el-select-v2
        v-bind="attrs"
        v-model="model"
        :class="round ? 'is-round' : ''"
        :placeholder="placeholder"
    >
      <slot></slot>
    </el-select-v2>
  </div>
</template>

<script lang="ts" setup>
import {useAttrs, defineModel} from 'vue'
defineOptions({
  inheritAttrs: false
})
const props = defineProps({
  placeholder: {
    type: String,
    attr: false,
    default: ''
  },
  label: {
    type: String,
    attr: false,
    default: ''
  },
  borderless: {
    type: Boolean,
    attr: false,
    default: false
  },
  shrink: {
    type: Boolean,
    attr: false,
    default: true
  },
  errorTips: {
    type: Boolean,
    attr: false,
    default: true
  },
  round: {
    type: Boolean,
    attr: false,
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
