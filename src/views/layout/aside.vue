<template>
  <div>
    <el-menu
        class="oga-layout-aside-menu"
        :default-active="activeMenu()"
        text-color="#666"
        :router="true"
        unique-opened
        :collapse="false"
        active-text-color="#409EFF"
    >
      <template v-for="route in menuList">
        <el-menu-item
            v-if="route.submenu.length === 0"
            node-key="url"
            :index="route.url"
            :class="route.style ?? ''"
        >
          <template #title>
            <el-icon :name="route.icon" v-if="isNotEmpty(route.icon)"></el-icon>
            {{ route.title }}
          </template>
        </el-menu-item>
        <el-sub-menu :index="route.url" v-if="route.submenu.length > 0">
          <template #title>
            <el-icon :name="route.icon" v-if="isNotEmpty(route.icon)"></el-icon>
            {{ route.title }}
          </template>
          <template v-for="sub in route.submenu" :key="sub.url">
            <el-menu-item :index="sub.url" :class="sub.style || ''">
              <template #title>
                <el-icon :name="sub.icon" v-if="isNotEmpty(sub.icon)"></el-icon>
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
import { ref } from "vue";
import { useRoute } from "vue-router";
import i18n from "@/plugins/i18n/base";
import { isNotEmpty } from "@/plugins/utility";
import {
  type MenuTypeState,
  type ParentMenuTypeState,
} from "@/stores/type/page-type";
let menuList = ref<MenuTypeState[]>([]);
const route = useRoute();

/**
 * Replace url params
 */
const replaceParams = (
    params: Record<string, string | number>,
    url: string,
): string => {
  Object.keys(params).forEach((key) => {
    url = url.replace(`:${key}:`, String(params[key]));
  });

  return url;
};

const processMenu = (
    list: MenuTypeState[],
    params: Record<string, string | number>,
) => {
  list.forEach((menu) => {
    if (menu.url) {
      menu.url = replaceParams(params, menu.url);
    }

    if (menu.submenu && menu.submenu.length) {
      processMenu(menu.submenu, params);
    }
  });
};

/**
 * Get menu list
 */
const getMenuList = (): MenuTypeState[] => {
  const list: MenuTypeState[] = JSON.parse(
      JSON.stringify(i18n.global.tm("menuList")),
  );
  const params = { ...route.params } as Record<string, string | number>;
  processMenu(list, params);
  return list;
};

/**
 * Active menu
 */
const activeMenu = (): string => {
  const { meta, path, params } = route;
  const parent = meta.parent as ParentMenuTypeState | undefined;
  const url = parent?.url ?? path;
  return replaceParams(params as Record<string, string | number>, url);
};

menuList.value = getMenuList();
</script>

<style scoped lang="scss"></style>
