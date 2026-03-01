<template>
  <div
      class="oga-unsaved"
      :style="cssText"
      v-show="model"
  >
    <div class="oga-unsaved-label">
      {{ tips }}
    </div>
    <div class="oga-unsaved-button">
      <el-button
          type="info"
          :round="round"
          @click="cancelEvent"
          :disabled="loading">{{ i18n.global.t('unsaved.cancel') }}
      </el-button>
      <el-button
          type="primary"
          :round="round"
          @click="confirmedEvent"
          :loading="loading">{{ i18n.global.t('unsaved.save') }}
      </el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import {useAttrs, defineEmits, onMounted, ref} from "vue";
import i18n from "../../i18n/base";

/**
 * default value
 */
const model = defineModel()

/**
 * Emits
 */
const emit = defineEmits(['cancel', 'confirmed']);

/**
 * Props
 */
const props = defineProps({
  tips: {
    type: String,
    default: () => {
      return i18n.global.t('unsaved.tips')
    }
  },
  offset: {
    type: [String, Number],
    default: () => {
      return 200
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
  },
  round: {
    type: Boolean,
    default: () => {
      return false
    }
  },
})

/**
 * CSS
 */
const cssText= ref({})

/**
 * Set CSS
 */
const setCss = () => {
  let offset = props.offset
  if (typeof offset === 'number' && offset > 0 && offset !== 200) {
    offset = offset + 'px'
  }
  if (offset !== '200px') {
    cssText.value.width = `calc(100% - ${offset})`;
  }

  if (props.height !== 60) {
    cssText.value.height = `${props.height}px`;
  }
  if (props.top && props.top !== 60 && props.top > -1) {
    cssText.value.top = `${props.top}px`
  }
}

/**
 * Cancel Event
 */
const cancelEvent = () => {
  model.value = false;
  emit('cancel')
}

/**
 * Confirm Event
 */
const confirmedEvent = () => {
  emit('confirmed')
}

/**
 * Set CSS
 */
setCss()
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