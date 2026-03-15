<template>
  <oga-layout
    :aside-top="0"
    :aside-bottom="0"
    :aside-width="240"
    aside-css="my-aside"
    @aside="asideClick"
    :is-router-view="true"
    copyright="OGA LTD."
  >
    <template #header v-if="true">
      <div class="oga-header-right">
        <div class="fox-header-right">
          <div class="el-dropdown">
            <div
              class="user-avatar el-dropdown-selfdefine"
              aria-haspopup="list"
              aria-controls="dropdown-menu-7985"
              role="button"
              tabindex="0"
            >
              <span
                class="el-avatar el-avatar--circle"
                style="height: 32px; width: 32px; line-height: 32px"
                ><img
                  src="https://s.tvagrp.com/file/1859964415561203713.webp"
                  style="object-fit: cover"
              /></span>
              Joe Xie
            </div>
            <ul
              class="el-dropdown-menu el-popper global-header-action"
              id="dropdown-menu-7985"
              style="display: none"
            >
              <!----><!----><!---->
              <li
                tabindex="-1"
                class="el-dropdown-menu__item el-dropdown-menu__item--divided"
              >
                <!---->
                Signed out
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
    <template #aside>
      <menu-list></menu-list>
      <div style="height: 3000px"></div>
    </template>
    <template #asideHeader>
      <router-link to="/">
        <div class="oga-layout-aside-logo">
          <img src="@/assets/svg/logo.svg" alt="" />
        </div>
      </router-link>
    </template>
    <template #asideFooter>
      <index name="setting"></index>
      Settings
    </template>
    <slot></slot>
  </oga-layout>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import menuList from "./aside.vue";
import lib from "@/plugins/utility.ts";
import Index from "../../../packages/iconfont/src/index.vue";

const asideClick = () => {
  console.log("asideClick:");
};
</script>

<style scoped lang="scss"></style>
