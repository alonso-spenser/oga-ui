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
.oga {
  &-header {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var.$themeColor;
    transition: all 0.3s;
    margin-left: calc(var(--asideWidth) * 1px);
    background-color: var.$headerBackground;
    box-shadow: none;
    .el-breadcrumb__inner,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner a,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
      color: rgba(255, 255, 255, 0.8);
    }

    .el-breadcrumb__separator {
      color: rgba(255, 255, 255, 0.6);
    }

    &-left {
      flex: 1;
      height: 60 * var.$px;
      padding: 0.5rem 1.875rem;
      display: flex;
      align-items: center;
    }
    &-right {
      display: flex;
      align-items: center;
      height: 60 * var.$px;
      padding: 0.5rem 1.875rem;
    }

    @media (max-width: 768px) {
      margin-left: 0;
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
      display: flex;
      flex-direction: column;
      border-right: 1px dotted #dee1e5;
      background-color: #fafafa;
      width: calc(var(--asideWidth) * 1px);
      transition: all 0.3s;

      &-logo {
        height: 60 * var.$px;
        padding: 0.5rem 1rem;
        display: flex;
        align-items: center;
        width: calc(var(--asideWidth) * 1px);
        background-color: var.$headerBackground;


        img {
          max-width: 120 * var.$px;
          max-height: 40 * var.$px;
        }
      }

      &-menu {
        padding-top: 1rem;
        background:none;
        border: 0;

        .oga-icon {
          font-size: 20px;
          margin-right: 3px;
        }

        .el-menu {
          background: none;
          &-item {
            &.is-active {
              font-weight: bold;
            }
          }
        }

        .el-sub-menu {
          .el-sub-menu__title {
            position: relative;

            .el-sub-menu__icon-arrow {
              display: none
            }
          }

          .el-menu-item {
            height: 1.875rem;
            line-height: 1.875rem;
            padding-left: 3rem !important;
            position: relative;
            background: url(data:image/svg+xml,%3Csvg%20width%3D%2221%22%20height%3D%2228%22%20viewBox%3D%220%200%2021%2028%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20x%3D%229%22%20width%3D%221.5%22%20height%3D%2228%22%20fill%3D%22%23CECECE%22%2F%3E%3C%2Fsvg%3E);
            background-repeat: repeat-y;
            background-position: 20px 0;

            &.is-active {
              background: url("data:image/svg+xml,%3Csvg%20width%3D'21'%20height%3D'28'%20viewBox%3D'0%200%2021%2028'%20fill%3D'none'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%3E%3Cpath%20d%3D'M19%2014.25H19.75V15.75H19V14.25ZM10.077%2013.362L10.7452%2013.0215V13.0215L10.077%2013.362ZM11.388%2014.673L11.7285%2014.0048H11.7285L11.388%2014.673ZM10.5%200V10.2H9V0H10.5ZM14.55%2014.25H19V15.75H14.55V14.25ZM10.5%2010.2C10.5%2011.0525%2010.5006%2011.6467%2010.5384%2012.1093C10.5755%2012.5632%2010.6446%2012.824%2010.7452%2013.0215L9.40873%2013.7025C9.18239%2013.2582%209.08803%2012.7781%209.04336%2012.2315C8.99942%2011.6936%209%2011.0277%209%2010.2H10.5ZM14.55%2015.75C13.7223%2015.75%2013.0564%2015.7506%2012.5185%2015.7066C11.9719%2015.662%2011.4918%2015.5676%2011.0475%2015.3413L11.7285%2014.0048C11.926%2014.1054%2012.1868%2014.1745%2012.6407%2014.2116C13.1033%2014.2494%2013.6975%2014.25%2014.55%2014.25V15.75ZM10.7452%2013.0215C10.9609%2013.4448%2011.3052%2013.7891%2011.7285%2014.0048L11.0475%2015.3413C10.3419%2014.9817%209.76825%2014.4081%209.40873%2013.7025L10.7452%2013.0215Z'%20fill%3D'%23CECECE'/%3E%3Cpath%20d%3D'M17%2012L20%2015L17%2018'%20stroke%3D'%23CECECE'%20stroke-width%3D'1.5'%20stroke-linecap%3D'round'%20stroke-linejoin%3D'round'/%3E%3C/svg%3E%0A");
              background-repeat: no-repeat;
              background-position: 20px 0;

              & ~ .el-menu-item {
                background: none!important;
              }
            }
          }
          &:not(.is-active) {
            .el-menu-item {
              background: none!important;
            }
          }
        }

        .el-sub-menu__title,
        .el-menu-item {
          height: 1.5rem;
          line-height: 1.5rem;
        }
      }

      &-content {
        position: relative;
        //height: calc(100% - 38px);
        //z-index: 5;
        overflow-y: auto;
        flex: 1;
      }
      &-footer {
        flex-shrink: 0;
        display: flex;
        padding: .5rem 1.25rem;
        align-items: center;
        font-size: 13 * var.$px;
        cursor: pointer;
        .oga-icon {
          vertical-align: center;
          font-size: 20 * var.$px;
          margin-right: .25rem;
        }
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
