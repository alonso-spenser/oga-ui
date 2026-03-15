<template>
  <section class="oga-layout">
    <div
        v-if="slots.aside"
        :style="cssVars"
        class="oga-layout-aside"
        @click="asideClick"
        :class="`${foldState ? 'active ' : ''}${asideCss}${$slots.asideFooter ? ' has-footer' : ''}`"
    >
      <div class="oga-layout-aside-header" v-if="$slots.asideHeader">
        <slot name="asideHeader"></slot>
      </div>
      <div class="oga-layout-aside-content">
        <slot name="aside"></slot>
      </div>
      <div class="oga-layout-aside-footer" v-if="$slots.asideFooter">
        <slot name="asideFooter"></slot>
      </div>
    </div>
    <div class="oga-header"
         :style="asideWidth"
         v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <router-view v-if="isRouterView"></router-view>
    <slot></slot>
    <slot name="footer" v-if="$slots.footer"></slot>
    <footer
        class="oga-layout-footer"
        :style="paddingLeft"
        v-if="copyright">&copy; {{ year }} {{ copyright }}
    </footer>
    <div
        class="oga-layout-mask"
        :class="foldState ? 'active' : ''"
        :style="`width: calc(100% - ${asideWidth}px);${maskColor}`"
        @click="foldState=false"></div>
  </section>
</template>

<script lang="ts" setup>
import { ref, useSlots, defineEmits } from 'vue'
import {isEmpty} from "../../plugins/utility";

const year = ref(new Date().getFullYear())
const cssVars = ref({})
const maskColor = ref('')
const foldImage = ref('')
const foldSize = ref('')
const paddingLeft = ref('')
const asideWidth = ref({})

const slots = useSlots()
const foldState = ref(false)
const props = defineProps({
  isRouterView: {
    type: Boolean,
    default: () => {
      return true
    }
  },
  copyright: {
    type: String,
    default: () => {
      return ''
    }
  },
  asideCss: {
    type: String,
    default: () => {
      return ''
    }
  },
  asideTop: {
    type: Number,
    default: () => {
      return 0
    }
  },
  asideBottom: {
    type: Number,
    default: () => {
      return 0
    }
  },
  asideWidth: {
    type: Number,
    default: () => {
      return 200
    }
  },
  foldIcon: {
    type: String,
    default: () => {
      return 'el-icon-s-fold'
    }
  },
  foldIconHeight: {
    type: Number,
    default: () => {
      return 60
    }
  },
  maskBackground: {
    type: String,
    default: () => {
      return ''
    }
  },
  headerColor: {
    type: String,
    default: () => {
      return '#030b2c'
    }
  },
  footerIndent: {
    type: Number,
    default: () => {
      return 200
    }
  }
})

const css = {}
if (props.asideTop > 0) {
  css['top'] = `${props.asideTop}px`
}
if (props.asideBottom > 0 || props.asideTop > 0) {
  css['height'] = `calc(100% - ${(props.asideTop + props.asideBottom)}px)`
}
cssVars.value = {
  '--asideWidth': props.asideWidth,
  ...css
}
asideWidth.value = {
  '--asideWidth': props.asideWidth
}
maskColor.value = isEmpty(props.maskBackground) ? '' : `background-color: ${props.maskBackground}`
foldImage.value = props.foldIconHeight !== 60 && props.foldIconHeight > 0 ? `width: ${props.foldIconHeight}px;height:${props.foldIconHeight}px` : ''
foldSize.value = props.foldIconHeight !== 60 && props.foldIconHeight > 0 ? `font-size: ${props.foldIconHeight / 2}px` : ''
paddingLeft.value = props.footerIndent > 0 && props.footerIndent !== 200 ? `text-indent:${props.footerIndent}px` : ''

const emit = defineEmits(['aside']);
const asideClick = () => {
  emit('aside')
}
</script>

<style lang="scss">
@use "../../style/index.scss" as var;
</style>
