<template>
  <section
      class="oga-layout-main"
      :style="cssVars"
  >
    <div class="oga-page-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <section
        v-if="googleStyle"
        ref="refLayoutPage"
        class="oga-page oga-google-style"
        :style="cssVars"
        :class="props.percentage > 0 ? `percent-${percentage}` : ''">
      <section class="oga-page-content" :class="padding ? 'has-padding' : ''">
        <slot></slot>
      </section>
    </section>
    <section
        v-else
        ref="refLayoutPage"
        class="oga-page">
      <section class="oga-page-content" :class="padding ? 'has-padding' : ''">
        <slot name="default"></slot>
      </section>
    </section>
    <div class="oga-page-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, useSlots } from 'vue'
let cssVars = ref({})
const props = defineProps({
  offset: {
    type: Number,
    default: () => {
      return 220
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
      padding-bottom: 1rem;
    }

    &-footer {
      padding-top: 1rem;
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
}
</style>
