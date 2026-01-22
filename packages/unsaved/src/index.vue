<template>
  <div
      class="oga-unsaved"
      :style="cssText"
      v-show="unsaved"
  >
    <div class="oga-unsaved-label">
      {{ tips }}
    </div>
    <div class="oga-unsaved-button">
      <el-button
          type="info"
          size="small"
          @click="cancelEvent"
          :disabled="loading">{{ cancelText }}
      </el-button>
      <el-button
          type="primary"
          size="small"
          @click="confirmedEvent"
          :loading="loading">{{ saveText }}
      </el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import {useAttrs, defineEmits, onMounted} from "vue";
import i18n from "../../i18n/base";

const props = defineProps({
  tips: {
    type: String,
    default: () => {
      return i18n.global.t('unsaved.tips')
    }
  },
  unsaved: {
    type: Boolean,
    default: () => {
      return false
    }
  },
  offset: {
    type: String,
    default: () => {
      return '200'
    }
  },
  height: {
    type: Number,
    default: () => {
      return 60
    }
  },
  top: {
    type: Number,
    default: () => {
      return 0
    }
  },
  loading: {
    type: Boolean,
    default: () => {
      return false
    }
  }
})
let attrs = useAttrs()
attrs = {
  ...attrs,
  ...props
}
let cancelText= '', saveText= '',  cssText= ''

const setCss = () => {
  cancelText = i18n.global.t('unsaved.cancel')
  saveText = i18n.global.t('unsaved.save')
  let css = []
  let offset = props.offset
  if (/^[0-9]*[1-9][0-9]$/.test(offset)) {
    offset = offset + 'px'
  }
  if (offset !== '200px') {
    css.push(`width: calc(100% - ${offset})`)
  }
  if (props.height !== 60) {
    css.push(`height: ${props.height}px`)
  }
  if (props.top && props.top !== 60 && props.top > -1) {
    css.push(`top: ${props.top}px`)
  }
  cssText = css.join(';')
}

setCss()

const emit = defineEmits(['cancel', 'update:unsaved', 'confirmed']);

const cancelEvent = () => {
  emit('cancel')
  emit('update:unsaved', false)
}
const confirmedEvent = () => {
  emit('confirmed')
}
</script>

<style scoped lang="scss">
@use "../../style/index.scss" as var;

.oga-unsaved {
  position: fixed;
  height: 59px;
  width: calc(100% - 200px);
  right: 0;
  top: 0;
  background-color: #fdf6ec;
  z-index: 18;
  padding-right: 15px;
  padding-left: 15px;
  align-items: center;
  justify-content: space-between;
  display: flex;

  .oga-unsaved-content {
    background-color: yellow;
  }

  .oga-unsaved-label {
    color: var.$colorWarning;
  }
}
</style>