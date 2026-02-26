<template>
  <div :style="{'--radius': radius}">
    <div class="file-grid" :class="model.length === 0 ? 'none' : ''" v-draggable="[ model,{ animation: 150,ghostClass: 'ghost',}]">
      <div
          class="file-grid-item file-grid-drag"
          v-for="(img, index) in model"
          :key="`file-guid-${index}`">
        <div class="file-grid-content">
          <img :src="img.url" :alt="img.title">
          <div class="file-grid-action">
            <p>
              <label @click="altDialog(img, index)">
                <svg viewBox="0 0 1532 1024">
                  <path
                      d="M188.74248556 561.99248544h151.59011704l-79.47192457-219.32187142L188.74248556 561.99248544z m-174.16736806 258.02573071l210.03617041-612.81110961h165.65251927L614.48494155 820.01821615h-182.12423719l-64.51933309-181.0469794h-205.46266378L101.51688777 820.01821615H14.5751175z m670.86689983 0V207.20710654h171.58065923v530.3073816H1078.93125552V820.01821615H685.44201733z m512.37459341 0V289.71083327H1033.77675345V207.20710654h499.92485187v82.50372673h-163.57863661V820.01821615H1197.81661074z"
                  ></path>
                </svg>
              </label>
              <label @click="removeAt(index)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32zm448-64v-64H416v64zM224 896h576V256H224zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32m192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32"></path></svg>
              </label>
            </p>
          </div>
          <label
              v-if="!isEmpty(img.title)"
              class="image-alt"></label>
        </div>
      </div>
      <el-upload
          :class="model.length === 0 ? 'file-grid-none' : 'file-grid-item'"
          drag
          :action="action"
          multiple
          :on-success="uploadSuccess"
          :show-file-list="false"
          v-if="model.length < max"
      >
        <div class="oga-image-upload-drag">
          <svg class="el-icon--upload" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
            <path fill="currentColor" d="M544 864V672h128L512 480 352 672h128v192H320v-1.6c-5.376.32-10.496 1.6-16 1.6A240 240 0 0 1 64 624c0-123.136 93.12-223.488 212.608-237.248A239.81 239.81 0 0 1 512 192a239.87 239.87 0 0 1 235.456 194.752c119.488 13.76 212.48 114.112 212.48 237.248a240 240 0 0 1-240 240c-5.376 0-10.56-1.28-16-1.6v1.6z"></path>
          </svg>
          <div class="el-upload__text" v-html="i18n.global.tm('fileUpload.drag')" v-if="model.length === 0"></div>
        </div>
        <template #tip v-if="isNotEmpty(tip)">
          <div class="el-upload__tip">
            {{tip}}
          </div>
        </template>
      </el-upload>
    </div>
    <el-dialog
        :title="i18n.global.t('fileUpload.alt.heading')"
        :close-on-click-modal="false"
        v-model="displayAlt"
        class="file-grid-alt"
        width="660px"
    >
      <el-row :gutter="20">
        <el-col :span="5">
          <div class="oga-alt-preview">
            <img :src="altEntity.url" :alt="altEntity.title">
          </div>
        </el-col>
        <el-col :span="17">
          <p>
            {{ i18n.global.t('fileUpload.alt.label') }}
          </p>
          <el-input
              v-model="altEntity.title"
              :placeholder="i18n.global.t('fileUpload.alt.placeholder')"
          >
          </el-input>
          <p class="text-secondary">
            {{ i18n.global.t('fileUpload.alt.subheading') }}
          </p>
        </el-col>
      </el-row>
      <template #footer>
        <el-button @click="displayAlt = false">{{ i18n.global.t('fileUpload.cancel') }}</el-button>
        <el-button
            type="primary"
            @click="editAlt">{{ i18n.global.t('fileUpload.confirm') }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import type { UploadProps } from 'element-plus'
import number from "../../input/number.ts";
import { vDraggable } from 'vue-draggable-plus'
import {isEmpty,isNotEmpty, getSuffix, getFileType} from "../../plugins/utility";
import i18n from "../../i18n/base";

/**
 * default value
 */
const model = defineModel()

const displayAlt = ref(false)
let altEntity = ref({})

/**
 * editor props
 */
const props = defineProps({
  action:  {
    type: String,
    default: ""
  },
  tip:  {
    type: String,
    default: ""
  },
  folder: {
    type: String,
    default: ""
  },
  max: {
    type: number,
    default: 10
  },
  radius: {
    type: number,
    default: 6
  },
  /**
   * headers附加参数
   */
  headers: {
    type: String,
    token: ''
  },
  /**
   * 引用ID
   */
  refId: {
    type: String,
    default: ''
  },
  /**
   * 资源类型
   */
  resourceType: {
    type: Number,
    default: () => {
      return 1
    }
  },
})

/**
 * Extract all url values from fileList
 * @param list Ref array or normal array
 * @returns string[]
 */
const getImageList = (list: any): string[] => {
  // If it's a ref, use .value
  const source = Array.isArray(list) ? list : list.value

  return source
      .map((item: any) => item.url)
      .filter((url: string) => !!url) // remove empty values
}

/**
 * get file name without extension
 * @param fileName
 */
const getFileName = (fileName: string) => {
  return fileName.indexOf('.') === -1 ? fileName : fileName.substring(0, fileName.lastIndexOf('.'))
}

/**
 * Upload success
 * @param result
 */
const uploadSuccess: UploadProps['onSuccess'] = (result, file: any) => {
  model.value.push({
    title: getFileName(file.name).replace(/-/ig, ' '),
    url: result.data.url,
    refType: props.resourceType,
    refId: props.refId,
    needPass: 1,
    fileType: getFileType(file.name),
    suffix: getSuffix(file.name),
    description: ''
  })
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

/**
 * alt dialog
 * @param data
 * @param index
 */
const altDialog = (data, index) => {
  displayAlt.value = true
  altEntity = data
}

/**
 * edit alt
 */
const editAlt = () => {
  displayAlt.value = false
  altEntity.title = altEntity.title.replace(/(^\s*)|(\s*$)/g, '')
}

/**
 * delete image
 * @param index
 */
const removeAt = (index: number) => {
  ElMessageBox.confirm(
      i18n.global.t('fileUpload.delete.subheading'),
      i18n.global.t('fileUpload.delete.heading'),
      {
        confirmButtonText: i18n.global.t('fileUpload.confirm'),
        cancelButtonText: i18n.global.t('fileUpload.cancel'),
        type: 'warning',
      }
  )
      .then(() => {
        model.value.splice(index, 1)
      })
};
</script>

<style lang="scss">
@use "../../style/index.scss" as var;

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.oga-alt-preview {
  position: relative;
  width: 100%;
  overflow: hidden;

  &::before {
    display: block;
    content: "";
    padding-top: 100%;
  }

  img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}


.file-grid {
  display: inline-grid;
  grid-template-columns: 20% 20% 20% 20%  20%;
  width: 100%;

  &-item {
    position: relative;
    width: 100%;
    margin-bottom: 10px;
    overflow: hidden;
    cursor: move;

    .el-loading-parent--relative {
      position: absolute !important;
      top: 0;
      bottom: 0;
      left: 0;
      width: calc(100% - 10px);
      height: 100%;
    }

    .file-grid-content {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: calc(100% - 10px);
      height: 100%;
      overflow: hidden;
      border-radius: calc(var(--radius) * 1px);
      border: 1px solid #eceef4;

      img {
        position: absolute;
        height: 100%;
        width: 100%;
        object-fit: cover;
        object-position: center;
        transition: all 0.25s;
        z-index: 1;
      }

      .file-grid-action {
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: 2;
        transition: all 0.5s;
        display: flex;
        justify-content: center;
        flex-direction: column;
        opacity: 0;
        background-color: rgba(0, 0, 0, .5);

        p {
          width: 100%;
          display: flex;
          justify-content: center;
          justify-items: center;
          text-align: center;

          svg {
            height: 36px;
            fill: #fff;
            transition: all 0.5s;
          }

          label {
            cursor: pointer;
            display: flex;
            align-items: center;
            padding: 10px;

            &:last-child {
              svg {
                height: 30px;
              }
            }

            &:hover {
              svg {
                fill: #4ba2f9;
              }
            }
          }
        }

        &:hover {
          opacity: 1;
        }
      }

      .image-alt {
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 4;
        width: 30px;
        height: 30px;
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDdBNTQ2RUE3OUU1MTFFOUFFMTc4NkI0NkIzRDU4QkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDdBNTQ2RUI3OUU1MTFFOUFFMTc4NkI0NkIzRDU4QkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3OEVGRDlGRjc5RTQxMUU5QUUxNzg2QjQ2QjNENThCRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3OEVGREEwMDc5RTQxMUU5QUUxNzg2QjQ2QjNENThCRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoESk7sAAAbYSURBVHja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") no-repeat;
        background-size: 100%;
      }
    }

    &::before {
      display: block;
      content: "";
      padding-top: 100%;
    }

    &:first-child {
      grid-column: 1 / 3;
      grid-row: 1 / 3;
    }

    .el-upload {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      height: 100%;
      display: flex;
      width: 100%;

      .el-upload-dragger {
        height: 100%;
      }
    }
  }

  .el-upload-dragger {
    background-color: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: calc(var(--radius) * 1px);
    box-sizing: border-box;
    width: 100%;
    text-align: center;
    position: relative;
    padding-top: 15px;
    padding-bottom: 15px;
    transition: all 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 11.25rem;

    .el-icon--upload {
      transition: all 0.5s;
      width: 3rem;
      margin-bottom: 0;
    }

    &:hover {
      border-color: rgba(64, 158, 255, .2);
      background-color: rgba(64, 158, 255, .1);

      .el-icon--upload,
      .el-upload__text, .el-upload__text .el-icon-plus {
        color: #46a0fc;
      }
    }

    .el-upload-drag {
      width: 100%;
    }
  }

  &-none {
    grid-column: 1 / 10;
    grid-row: 1 / 3;

    .el-upload {
      width: 100%;
    }

    .el-icon--upload {
      margin-bottom: .5rem;
    }
  }

  &-alt {
    p {
      margin: 5px 0 0 0;
      line-height: 24px;
    }

    .el-dialog__body {
      padding: 0 20px;
    }
  }
}
</style>