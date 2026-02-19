<template>
  <main
      class="oga-layout-main"
      :style="cssVars"
  >
    <div class="oga-page-header" v-if="$slots.header" :class="padding ? 'has-padding' : ''">
      <slot name="header"></slot>
    </div>
    <section
        ref="refLayoutPage"
        class="oga-page">
      <section class="oga-page-content" :class="padding ? 'has-padding' : ''">
        <slot name="default"></slot>
      </section>
    </section>
    <div class="oga-page-footer" v-if="$slots.footer" :class="padding ? 'has-padding' : ''">
      <slot name="footer"></slot>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref, useSlots } from 'vue'
let cssVars = ref({})
const props = defineProps({
  offset: {
    type: Number,
    default: () => {
      return 240
    }
  },
  contentWidth: {
    type: Number,
    default: () => {
      return 90
    }
  },
  fullscreen: {
    type: Boolean,
    default: () => {
      return false
    }
  },
  loading: {
    type: Boolean,
    default: () => {
      return false
    }
  },
  padding: {
    type: Boolean,
    default: () => {
      return true
    }
  },
  loadingText: {
    type: String,
    default: () => {
      return "i18n.t('pageAborted.loading')"
    }
  },
  loadingBackgroundColor: String,
  googleStyle: {
    type: Boolean,
    default: () => {
      return false
    }
  },
  percentage: {
    type: Number,
    default: () => {
      return 0
    }
  }
})

cssVars.value = {
  '--offset': props.offset
}

</script>

<style lang="scss">
@use "../../style/index.scss" as var;
.oga {
  &-layout-main {
    flex: 1;
    height: 100%;
    width: 100%;
    margin: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    @media (min-width: 1024px) {
      margin-left: calc(var(--offset) * 1px);
      width: calc(100% - var(--offset) * 1px);
    }
  }

  &-page {
    flex: 1;
    height: 100%;
    width: 100%;
    margin: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    &-header {
      padding-top: 1.5rem;
      padding-bottom: .875rem;

      &.has-padding {
        padding-left: 1.875rem;
        padding-right: 1.875rem;
      }

      & + .oga-page {
        .oga-page-content {
          &.has-padding {
            padding-top: 0;
          }
        }
      }
    }

    &-footer {
      padding-bottom: .75rem;
      padding-top: .75rem;

      &.has-padding {
        padding-left: 1.875rem;
        padding-right: 1.875rem;
      }
    }

    &-content {
      flex:1;
      overflow-x: hidden;
      overflow-y: auto;
      &.has-padding {
        padding: 1.875rem;
      }
    }
  }

  &-filter {
    display: flex;
    justify-items: center;

    .time-select {
      width: 150px;
    }

    .text-count {
      line-height: 40px;
      text-indent: 15px;
    }
    &-item {
      .label {
        word-break: keep-all;
        line-height: 40px;
        margin-right: 8px;
        font-size: 14px;
      }

      .search-input {
        width: 280px;
      }

      & + & {
        margin-left: 10px;
      }

      .el-material-button {
        margin-top: 0.375rem;
      }
    }
  }
}
</style>
