<template>
  <el-form
      class="oga-form"
      :class="borderless ? 'borderless' : ''"
      v-bind="attrs"
  >
    <slot></slot>
  </el-form>
</template>
<script setup lang="ts">
import {useAttrs} from "vue";

const props = defineProps({
  borderless: {
    type: Boolean,
    default: () => {
      return true
    }
  },
})
let attrs = useAttrs()
attrs = {
  ...attrs,
  ...props
}
</script>

<style scoped lang="scss">
@use "../../style/index.scss" as var;

.oga-form {
  .el-form-item {
    &:not(:last-child) {
      margin-bottom: 20 * var.$px
    }

    &.gutter-less {
      &:not(:last-child) {
        margin-bottom: 10 * var.$px
      }
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &.borderless {
    .el-form-item {
      margin-bottom: 0;
    }
  }

  .el-form-item__content {
    line-height: normal;
  }
}
</style>