<template>
  <div
      class="oga-material"
      :style="cssVars"
      :class="`${errorTips ?'' : ' no-tips'}`">
    <label
        class="oga-material-label"
    >{{ label }}</label>
    <el-date-picker
        v-bind="attrs"
        v-model="model"
        :class="round ? 'is-round' : ''"
        :placeholder="placeholder"
    >
    </el-date-picker>
  </div>
</template>

<script lang="ts" setup>
import {ref, useAttrs} from 'vue'
import type { CSSProperties } from 'vue'
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
  },
  width: {
    type: Number,
    default: 120
  }
})

/**
 * Use Attrs
 */
const attrs = {
  ...useAttrs()
}
const cssVars = ref<CSSProperties>({})
cssVars.value = {
  '--width': props.width
} as CSSProperties

/**
 * default value
 */
const model = defineModel()
</script>

<style lang="scss" scoped>
@import url("../../style/index.scss");
.oga-material {
  width: calc(var(--width) * 1px);
}
</style>
