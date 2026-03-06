<template>
  <el-upload
      class="oga-avatar"
      :action="action"
      :style="{'--size': size, '--radius': radius}"
      :show-file-list="false"
      :accept="'image/*'"
      :on-success="uploadSuccess"
      :before-upload="beforeUpload"
  >
    <img v-if="model" :src="model" class="oga-avatar-img" alt="" >
    <el-icon class="oga-avatar-icon" :class="isEmpty(model) ? 'is-empty' : ''"><Plus /></el-icon>
  </el-upload>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import number from "../../input/number.ts";
import {isEmpty} from "../../plugins/utility";

/**
 * default value
 */
const model = defineModel()

/**
 * editor props
 */
const props = defineProps({
  action:  {
    type: String,
    default: ""
  },
  folder: {
    type: String,
    default: ""
  },
  size: {
    type: Number,
    default: 178
  },
  radius: {
    type: Number,
    default: 6
  },
  /**
   * headers附加参数
   */
  headers: {
    type: String,
    token: ''
  },
})

/**
 * Upload success
 * @param result
 */
const uploadSuccess: UploadProps['onSuccess'] = (
    result
) => {
  model.value = result.data.url
}

/**
 * Upload before upload
 * @param rawFile
 */
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
</script>

<style lang="scss">
@use "../../style/index.scss" as var;

.oga-avatar {
  .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: calc(var(--radius) * 1px);
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: calc(var(--size) * 1px);
    height: calc(var(--size) * 1px);
    transition: var(--el-transition-duration-fast);

    &:hover {
      border-color: var(--el-color-primary);

      img {
        opacity: .06;
      }
      .el-icon {
        opacity: 1;

        &.oga-avatar-icon {
          color: var(--el-color-primary);
        }
      }
    }
  }
  &-img {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: contain;
    object-position: center;
    transition: all 0.3s ease 0s;
  }

  .el-icon{
    transition: all 0.3s ease 0s;
    &:not(.is-empty) {
      opacity: 0;
    }

    &.oga-avatar-icon {
      transition: all 0.3s ease 0s;
      font-size: 2rem;
      color: #8c939d;
      text-align: center;
    }
  }
}
</style>