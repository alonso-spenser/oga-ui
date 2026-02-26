<template>
  <oga-page :offset="240" :percentage="100" :padding="true">
    <oga-section heading="ICONS">
      <div class="icon-package">
        <div class="icon-list" v-for="icon in icons" :key="icon">
          <oga-icon :name="icon"></oga-icon>
          <p>{{icon}}</p>
        </div>
      </div>
    </oga-section>
  </oga-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
const icons = [
  "avatar",
  "group",
  "customer",
  "user",
  "video",
  "cs",
  "brightness",
  "contrast",
  "face",
  "link",
  "flash",
  "key",
  "voice",
  "safe",
  "code",
  "info",
  "task",
  "graphics",
  "add-list",
  "save",
  "label",
  "pin",
  "cancel",
  "list",
  "wallet",
  "bill-empty",
  "bill-new",
  "bill-complete",
  "sign-in",
  "car",
  "truck",
  "pack",
  "shop",
  "logout",
  "personal",
  "print",
  "edit",
  "laptop",
  "copy",
  "lock",
  "vs",
  "bag",
  "gift",
  "en",
  "theme",
  "wand",
  "diamond",
  "cn",
  "help",
  "tiers",
  "navigate",
  "correct",
  "android",
  "incorrect",
  "table",
  "about",
  "plus",
  "equal",
  "minus",
  "switch",
  "refresh",
  "disable",
  "setting",
  "scan",
  "home",
  "delete",
  "frame",
  "more",
  "app",
  "full-screen",
  "shield",
  "currency-flow",
  "loan",
  "calculator",
  "finance",
  "dollar",
  "cny",
  "cancel-bill",
  "bank-card",
  "praise",
  "tread",
  "smile",
  "grow",
  "message",
  "sad",
  "share",
  "collect",
  "wang",
  "favorite",
  "calendar",
  "tree",
  "polyline",
  "cloud",
  "upload",
  "download",
  "pie",
  "columnar",
  "package",
  "package-collection",
  "package-move",
  "location",
  "earth",
  "sorting",
  "service",
  "cart",
  "customs",
  "msg",
  "news",
  "email",
  "notice",
  "eye",
  "eye-close"
]
</script>
<style scoped lang="scss">
.icon-package {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.icon-list {
  width: 110px;
  height: 60px;
  text-align: center;
  overflow: hidden;
  margin-bottom: 10px;
  .oga-icon {
    font-size: 2rem;
  }
  p {
    font-size: 12px;
  }
}
</style>