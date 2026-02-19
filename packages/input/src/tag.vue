<template>
  <div
      class="el-input-material"
      :class="`${borderless ? 'borderless' : ''}${errorTips ?'' : ' no-tips'}`">
    <label
        v-if="!borderless"
        class="el-input-material-label"
        :class="shrink || activated ? 'active' : ''">{{ label }}</label>

    <el-input-tag
        v-bind="attrs"
        v-model="defaultValue"
        :class="round ? 'is-round' : ''"
        :placeholder="shrink ? placeholder || '' : label"
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
import { ref, onMounted, useAttrs, useSlots, watch } from 'vue'
import {isArrayNotEmpty} from "../../plugins/utility";

let defaultValue = ref([])
const activated = ref(false)
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

let attrs = useAttrs()

attrs = {
  ...attrs,
  ...props
}

defaultValue.value = props.modelValue;
activated.value = isArrayNotEmpty(defaultValue.value)

onMounted(() => {
  activated.value = !props.modelValue
});

watch(() => props.modelValue, (newValue, oldValue) => {
  activated.value = isArrayNotEmpty(newValue)
  if (newValue !== oldValue) {
    defaultValue.value = props.modelValue;
  }
});
</script>

<style lang="scss" scoped>
@import url("../../style/index.scss");
</style>
