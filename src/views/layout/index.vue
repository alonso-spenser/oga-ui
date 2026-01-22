<template>
  <oga-layout
      copyright="OGA LTD."
      :aside-top="0"
      :aside-bottom="0"
      :aside-width="300"
      aside-css="my-aside"
      :is-router-view="true"
  >
    <template #header>
      <div class="oga-header-logo">
        <img src="@/assets/svg/logo.svg" class="logo" alt="" />
      </div>
      <div class="oga-header-left">
        <div
            aria-label="Breadcrumb"
            role="navigation"
            class="el-breadcrumb breadcrumb-wrap"
        >
  <span class="el-breadcrumb__item" aria-current="page"
  ><span role="link" class="el-breadcrumb__inner">Logistics tracking </span
  ><span role="presentation" class="el-breadcrumb__separator">/</span></span
  >
          <span class="el-breadcrumb__item" aria-current="page"
          ><span role="link" class="el-breadcrumb__inner">20208382</span
          ><span role="presentation" class="el-breadcrumb__separator">/</span></span
          >
        </div>

      </div>
      <div class="oga-header-right">
        <div class="fox-header-right">
          <!---->
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
    </template>
    <slot></slot>
  </oga-layout>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import menuList from './aside.vue'


</script>

<style scoped lang="scss"></style>
