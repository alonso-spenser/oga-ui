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
import { ref, onMounted, useAttrs, useSlots, watch } from 'vue'
import lib from "../../plugins/utility";


let defaultValue = ''
const activated = ref(false)
const props = defineProps({
  modelValue: {
    type: String,
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

defaultValue = props.modelValue;
activated.value = lib.isEmpty(defaultValue)

onMounted(() => {
  activated.value = lib.isEmpty(props.modelValue)
});

watch(() => props.modelValue, (newValue, oldValue) => {
  activated.value = lib.isEmpty(newValue)
});

</script>

<style lang="scss" scoped>
@import url("../../style/index.scss");
</style>
