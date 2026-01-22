<template>
  <el-form-item
      :class="showMessage ? '' : 'gutter-less'"
      v-bind="attrs"
  >
    <slot></slot>
  </el-form-item>
</template>
<script setup lang="ts">
import {useAttrs} from "vue";

const props = defineProps({
  showMessage: {
    type: Boolean,
    default: () => {
      return false
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
.el-form-item {
  &.is-success {
    .el-input__inner,
    .el-input__inner:focus,
    .el-textarea__inner,
    .el-textarea__inner:focus,
    .el-message-box__input input.invalid,
    .el-message-box__input input.invalid:focus {
      //border-color: #c2e7b0;
      //color: #67c23a;
    }
  }

  &.is-error {
    .el-input__inner,
    .el-input__inner:focus,
    .el-textarea__inner,
    .el-textarea__inner:focus,
    .el-message-box__input input.invalid,
    .el-message-box__input input.invalid:focus {
      border-color: #f56c6c;
    }

    .el-input-material-label {
      color: #f56c6c;
    }
  }

  &:focus {
    .el-input-material-label {
      color: #409eff;
    }
  }
}

.material-form {
  .el-form-item {
    margin-bottom: 20px;
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