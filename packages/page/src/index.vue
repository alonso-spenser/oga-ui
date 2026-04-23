<template>
  <main
      class="oga-page"
      :style="cssVars"
  >
    <div
        v-if="navigation"
        class="oga-navigation">
      <div class="oga-header-icon" @click="goBack" v-if="breadcrumbList.length > 1">
        <el-icon name="arrow-left"></el-icon>
        {{i18n.global.t('back')}}
      </div>
      <el-breadcrumb
          v-if="breadcrumbList.length > 1 && breadcrumb"
          separator="/">
        <template v-for="({ title, path }, index) in breadcrumbList">
          <el-breadcrumb-item
              :key="index"
              class="oga-navigation-link"
              v-if="index < breadcrumbList.length - 1"
              :to="breadcrumbList.length - 1 !== index && { path }"
          >{{ title }}
          </el-breadcrumb-item>
        </template>
      </el-breadcrumb>
      <div class="oga-navigation-item">
        <el-divider direction="vertical" border-style="dashed"  v-if="breadcrumbList.length > 1"></el-divider>
      </div>
      <span class="text-large font-600" v-if="breadcrumbList.length > 0">{{breadcrumbList[breadcrumbList.length-1]?.title}}</span>
      <div class="oga-navigation-right">
        <slot name="navigation" v-if="$slots.navigation"></slot>
      </div>
    </div>
    <div class="oga-page-header" v-if="$slots.header" :class="padding ? 'has-padding' : ''">
      <slot name="header"></slot>
    </div>
    <section class="oga-page-content" :class="padding ? 'has-padding' : ''">
      <slot name="default"></slot>
    </section>
    <div class="oga-page-footer" v-if="$slots.footer" :class="padding ? 'has-padding' : ''">
      <slot name="footer"></slot>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import {type RouteParamsGeneric, type RouteLocationNormalizedLoaded, useRoute, useRouter} from "vue-router";
import i18n from "../../i18n/base";
import {isNotEmpty} from "../../plugins/utility";
const cssVars = ref({})
const props = defineProps({
  offset: {
    type: Number,
    default: () => {
      return 240
    }
  },
  navigationOffset: {
    type: Number,
    default: () => {
      return 450
    }
  },
  padding: {
    type: Boolean,
    default: () => {
      return true
    }
  },
  navigation: {
    type: Boolean,
    default: () => {
      return true
    }
  },
  breadcrumb: {
    type: Boolean,
    default: () => {
      return false
    }
  },
  color: {
    type: String,
    default: ''
  },
})
const route = useRoute();
const router = useRouter();

cssVars.value = {
  '--offset': props.offset,
  '--fixed': props.navigationOffset
}
if (isNotEmpty(props.color)) {
  cssVars.value['--navColor'] = props.color
}

interface Breadcrumb {
  path?: string;
  title?: string;
}

interface ParentPageState {
  path?: string;
  title?: string;
  previous?: string;
}

interface MetaState {
  title?: string;
  requireAuth?: boolean;
  parent?: ParentPageState;
  crumbs?: Breadcrumb[];
}

const breadcrumbList = ref<Breadcrumb[]>([]);

/**
 * Replace path parameters
 * /user/:id: -> /user/123
 */
const replaceParams = (
    params: RouteParamsGeneric,
    url: string
): string => {
  let processedUrl = url;

  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value) {
      processedUrl = processedUrl.replace(
          new RegExp(`:${key}:`, "g"),
          String(value)
      );
    }
  });

  return processedUrl;
};

/**
 * Get breadcrumbs
 */
const getBreadcrumbList = (
    route: RouteLocationNormalizedLoaded
): Breadcrumb[] => {

  const list: Breadcrumb[] = [];
  const { matched, params } = route;
  matched.forEach((record, index) => {
    const meta = record.meta as MetaState;
    if (meta.crumbs?.length) {
      meta.crumbs.forEach((crumb) => {
        if (!crumb.path || !crumb.title) return;
        const path = replaceParams(params, crumb.path);
        if (!list.some(b => b.path === path)) {
          list.push({
            path,
            title: crumb.title
          });
        }
      });
    }
    if (meta.title && record.path && index > 0) {
      const path = replaceParams(params, record.path);
      if (!list.some(b => b.path === path)) {
        list.push({
          path,
          title: meta.title
        });
      }
    }
  });
  return list;
};

/**
 * Previous step
 */
const goBack = () => {
  const list = breadcrumbList.value
  if (list.length > 0) {
    list[0]?.path && router.push({ path: list[0].path });
  }
}

/**
 * Refresh breadcrumbs
 */
watch(
    () => route.path,
    () => {
      breadcrumbList.value = getBreadcrumbList(route);
    },
    { immediate: true }
);

</script>

<style lang="scss">
@use "../../style/index.scss" as var;
$color: var(--navColor, rgba(255, 255, 255, 0.6));
.oga {
  &-page {
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

    &-header {
      padding-top: 1.5rem;
      padding-bottom: .875rem;

      &.has-padding {
        padding-left: 1.875rem;
        padding-right: 1.875rem;

        &  + .has-padding {
          padding-top: .5rem;
        }
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

  &-navigation {
    display: flex;
    align-items: stretch;
    height: 60px;
    z-index: 3;
    position: fixed;
    top: 0;
    color: $color;

    @media (min-width: 768px) {
      width: calc(100% - var(--fixed) * 1px);
    }

    & > * {
      display: flex;
      align-items: center;
      padding-right: .5rem;

      &:not(:first-child) {
        padding-left: .5rem;
      }
    }

    .el-button {
      &.is-link {
        color: $color;
      }

      &:hover {
        color: var(--el-color-primary);
      }
    }

    .oga-icon {
      font-size: 1.25rem;
    }

    .oga-header-icon {
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s;

      .el-icon {
        transition: all 0.3s;

        font-size: 1.25rem;
        margin-right: 10px;
      }

      &:hover {
        color: var(--el-color-primary);

        .el-icon {
          color: var(--el-color-primary);
        }
      }
    }

    .el-divider--vertical {
      border-left: 1px $color var(--el-border-style);
    }

    .el-breadcrumb__inner,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner a,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
      color: $color;
      font-weight: normal;

      &.is-link {
        cursor: pointer;

        &:hover {
          color: var(--el-color-primary);
        }
      }
    }

    .el-breadcrumb__separator {
      color: $color;
    }

    &-right {
      flex: 1;
      display: flex;

      & > * {
        display: flex;
        align-items: center;
        padding-right: .5rem;

        &:not(:first-child) {
          padding-left: .5rem;
        }
      }

      .is-right {
        margin-left: auto;
      }
    }

  }
}
</style>
