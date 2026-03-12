<template>
  <div>
    <el-menu
      :default-active="activeMenu"
      class="oga-layout-aside-menu"
      text-color="#666"
      @select="openMenu"
      :router="false"
      unique-opened
      :collapse="false"
      active-text-color="#409EFF"
    >
      <template v-for="(route, index) in menuList">
        <el-menu-item
          v-if="route.submenu.length === 0"
          :key="route.url"
          :index="route.url || index.toString()"
          :class="route.style || ''"
        >
          <template #title>
            <index :name="route.icon" v-if="isNotEmpty(route.icon)"> </index>
            {{ route.title }}
          </template>
        </el-menu-item>
        <el-sub-menu
          :key="route.url"
          v-if="route.submenu.length > 0"
          :index="route.url || index.toString()"
        >
          <template #title>
            <index :name="route.icon" v-if="isNotEmpty(route.icon)"> </index>
            {{ route.title }}
          </template>
          <template v-for="sub in route.submenu" :key="sub.url">
            <el-menu-item :index="sub.url" :class="sub.style || ''">
              <template #title>
                <index :name="sub.icon" v-if="isNotEmpty(sub.icon)"> </index>
                {{ sub.title }}
              </template>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import i18n from "@/plugins/i18n/base";
import { isNotEmpty } from "@/plugins/utility";
import Index from "../../../packages/iconfont/src/index.vue";
let menuList: any[] = [];
const route = useRoute();
const router = useRouter();

const replaceParams = (params: { [x: string]: any }, url: string) => {
  for (const key in params) {
    url = url.replace(`:${key}:`, params[key]);
  }
  return url;
};

const getMenuList = () => {
  const list = JSON.parse(JSON.stringify(i18n.global.tm("menuList")));
  let { params } = route;
  params = {
    ...params,
  };
  list.forEach((o) => {
    if (o.url) {
      o.url = replaceParams(params, o.url);
    }
    o.submenu.forEach((sub) => {
      if (sub.url) {
        sub.url = replaceParams(params, sub.url);
      }
    });
  });
  const s = [];
  /**
   *  处理导航栏展示，隐藏
   * @type {*[]}
   */
  // list.forEach((o, i, y) => {
  //   if (this.$checkPermission(o.code)) {
  //     o.submenu = o.submenu.filter((sb) => {
  //       return this.$checkPermission(sb.code)
  //     })
  //     s.push(o)
  //   }
  // })
  menuList = list;
};

const openMenu = (url: string) => {
  if (route.path === url) {
    return false;
  }
  router.push({
    path: url,
  });
};

/**
 * 路由标记
 */
const activeMenu = () => {
  const { meta, path, params } = route;
  const url = meta.parent
    ? typeof meta.parent === "object"
      ? meta.parent.url
      : meta.parent
    : path;
  return replaceParams(params, url);
};

getMenuList();
</script>

<style scoped lang="scss"></style>
