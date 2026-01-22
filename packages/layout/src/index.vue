<template>
  <section
      class="oga-layout">
    <div
        v-if="slots.aside"
        :style="cssVars"
        class="oga-layout-aside"
        :class="`${foldState ? 'active ' : ''}${asideCss}`"
    >
      <div class="oga-layout-aside-content">
        <slot name="aside"></slot>
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
import { ref, useSlots } from 'vue'
import lib from "../../plugins/utility";

const year = ref(new Date().getFullYear())
let cssVars = ref({})
let maskColor = ref('')
let foldImage = ref('')
let foldSize = ref('')
let paddingLeft = ref('')
let asideWidth = ref({})

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
  footerIndent: {
    type: Number,
    default: () => {
      return 200
    }
  }
})

let css = {}
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
maskColor.value = lib.isEmpty(props.maskBackground) ? '' : `background-color: ${props.maskBackground}`
foldImage.value = props.foldIconHeight !== 60 && props.foldIconHeight > 0 ? `width: ${props.foldIconHeight}px;height:${props.foldIconHeight}px` : ''
foldSize.value = props.foldIconHeight !== 60 && props.foldIconHeight > 0 ? `font-size: ${props.foldIconHeight / 2}px` : ''
paddingLeft.value = props.footerIndent > 0 && props.footerIndent !== 200 ? `text-indent:${props.footerIndent}px` : ''

</script>

<style lang="scss">
@use "../../style/index.scss" as var;
.oga {
  &-header {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var.$themeColor;
    transition: all 0.3s;
    background: none;
    box-shadow: none;

    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      left: calc(var(--asideWidth) * 1px);
      bottom: 0;
      border-bottom: 1px solid #dee1e5;
    }

    &-logo {
      height: 60px;
      padding: 8px 15px;
      display: flex;
      align-items: center;
      width: calc(var(--asideWidth) * 1px);
    }

    .logo {
      max-width: 120px;
      max-height: 40px;
    }

    &-left {
      flex: 1;
      height: 60px;
      padding: 8px 15px;
      display: flex;
      align-items: center;
    }
    &-right {
      display: flex;
      align-items: center;
      height: 60px;
      padding: 8px 15px;
    }

    @media (max-width: 768px) {
      margin-left: 0;
      padding-left: 60px;
    }

    .global-header-info {
      display: flex;
      align-items: center;
    }

    .user-avatar {
      display: flex;
      color: #909399;
      align-items: center;
      margin-left: 6px;
      cursor: pointer;

      .el-avatar {
        margin-right: 5px;
      }

      text-transform: uppercase;
    }

    .ship-calculator {
      width: 32px;
      height: 32px;
      padding: 7px !important;

      i {
        font-size: 18px;
        color: #7F7F7F;
      }
    }

    .el-breadcrumb__inner a,
    .el-breadcrumb__inner.is-link {
      font-weight: normal;
    }
  }

  &-layout {
    overflow: hidden;
    position: relative;
    margin-left: 0;
    transition: all 0.3s;
    height: 100%;
    display: flex;
    flex-direction: column;

    &-footer {
      flex-shrink: 0;
      text-align: center;
      padding-top: 6px;
      color: #909399;
      font-size: 10px;
      text-indent: 200px;
    }

    &-mask {
      content: '';
      position: absolute;
      width: calc(100% - 200px);
      height: 100%;
      left: 200px;
      top: 0;
      z-index: 4;
      background-color: rgba(0, 0, 0, 0.8);

      &:not(.active) {
        display: none;
      }

      @media (min-width: 768px) {
        display: none;
      }
    }

    &-fold {
      width: 60px;
      height: 60px;
      font-size: 24px;
      position: absolute;
      right: -60px;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 11;

      img {
        width: 24px;
        height: 24px;
      }

      @media (min-width: 768px) {
        display: none;
      }
    }

    &-aside {
      position: absolute;
      z-index: 1;
      height: 100vh;
      top: 0;
      left: 0;
      border-right: 1px dotted #dee1e5;
      background-color: #fafafa;
      width: calc(var(--asideWidth) * 1px);
      transition: all 0.3s;

      &-content {
        position: relative;
        height: calc(100% - 60px);
        z-index: 5;
        top: 60px;
      }

      @media (max-width: 768px) {
        left: calc(var(--asideWidth) * -1px);
        .global-aside-mask {
          display: block;
        }

        &.active {
          left: 0;
        }
      }
    }
  }
}
</style>
