<template>
  <oga-page :offset="240"
            :percentage="100"
            :padding="true"
            :breadcrumb="true"
            v-loading="false"
            :navigation-right="true"
            :navigation-offset="450"
            color="#409EFFFF"
  >
    <template #navigation>
      <div class="oga-navigation-item">
        <el-button
            class="el-material-button"
            link
            @click="addEvent"
        >
          <oga-icon name="plus"></oga-icon>
        </el-button>
        <el-button
            class="el-material-button"
            link
            @click="addEvent"
        >
          <oga-icon name="plus"></oga-icon>
        </el-button>
      </div>
      <div class="oga-navigation-item">
        <el-button
            class="el-material-button"
            link
            @click="addEvent"
        >
          <oga-icon name="scan"></oga-icon>
        </el-button>
      </div>
    </template>
    <oga-section heading="Element ICONS" description="&lt;el-icon :name=&quot;icon&quot;&gt;&lt;/el-icon&gt;">
      <div class="icon-package">
        <div class="icon-list" v-for="icon in elIcons" :key="icon" @click="copyCode(icon, true)">
          <el-icon :name="icon"></el-icon>
          <p>{{ icon }}</p>
        </div>
      </div>
    </oga-section>
    <oga-section heading="OGA ICONS" description="&lt;oga-icon :name=&quot;icon&quot;&gt;&lt;/oga-icon&gt;">
      <div class="icon-package">
        <div class="icon-list" v-for="icon in icons" :key="icon" @click="copyCode(icon, false)">
          <oga-icon :name="icon"></oga-icon>
          <p>{{ icon }}</p>
        </div>
      </div>
    </oga-section>
  </oga-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useClipboard from "vue-clipboard3";
const { toClipboard } = useClipboard();
import { ElMessage } from "element-plus";
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
  "eye-close",
  "search",
];

const elIcons= ["add-location","aim","alarm-clock","apple","arrow-down-bold","arrow-down","arrow-left-bold","arrow-left","arrow-right-bold","arrow-right","arrow-up-bold","arrow-up","avatar","back","baseball","basketball","bell-filled","bell","bicycle","bottom-left","bottom-right","bottom","bowl","box","briefcase","brush-filled","brush","burger","calendar","camera-filled","camera","caret-bottom","caret-left","caret-right","caret-top","cellphone","chat-dot-round","chat-dot-square","chat-line-round","chat-line-square","chat-round","chat-square","check","checked","cherry","chicken","chrome-filled","circle-check-filled","circle-check","circle-close-filled","circle-close","circle-plus-filled","circle-plus","clock","close-bold","close","cloudy","coffee-cup","coffee","coin","cold-drink","collection-tag","collection","comment","compass","connection","coordinate","copy-document","cpu","credit-card","crop","d-arrow-left","d-arrow-right","d-caret","data-analysis","data-board","data-line","delete-filled","delete-location","delete","dessert","discount","dish-dot","dish","document-add","document-checked","document-copy","document-delete","document-remove","document","download","drizzling","edit-pen","edit","eleme-filled","eleme","element-plus","expand","failed","female","files","film","filter","finished","first-aid-kit","flag","fold","folder-add","folder-checked","folder-delete","folder-opened","folder-remove","folder","food","football","fork-spoon","fries","full-screen","goblet-full","goblet-square-full","goblet-square","goblet","gold-medal","goods-filled","goods","grape","grid","guide","handbag","headset","help-filled","help","hide","histogram","home-filled","hot-water","house","ice-cream-round","ice-cream-square","ice-cream","ice-drink","ice-tea","info-filled","iphone","key","knife-fork","lightning","link","list","loading","location-filled","location-information","location","lock","lollipop","magic-stick","magnet","male","management","map-location","medal","memo","menu","message-box","message","mic","microphone","milk-tea","minus","money","monitor","moon-night","moon","more-filled","more","mostly-cloudy","mouse","mug","mute-notification","mute","no-smoking","notebook","notification","odometer","office-building","open","operation","opportunity","orange","paperclip","partly-cloudy","pear","phone-filled","phone","picture-filled","picture-rounded","picture","pie-chart","place","platform","plus","pointer","position","postcard","pouring","present","price-tag","printer","promotion","quartz-watch","question-filled","rank","reading-lamp","reading","refresh-left","refresh-right","refresh","refrigerator","remove-filled","remove","right","scale-to-original","school","scissor","search","select","sell","semi-select","service","set-up","setting","share","ship","shop","shopping-bag","shopping-cart-full","shopping-cart","shopping-trolley","smoking","soccer","sold-out","sort-down","sort-up","sort","stamp","star-filled","star","stopwatch","success-filled","sugar","suitcase-line","suitcase","sunny","sunrise","sunset","switch-button","switch-filled","switch","takeaway-box","ticket","tickets","timer","toilet-paper","tools","top-left","top-right","top","trend-charts","trophy-base","trophy","turn-off","umbrella","unlock","upload-filled","upload","user-filled","user","van","video-camera-filled","video-camera","video-pause","video-play","view","wallet-filled","wallet","warn-triangle-filled","warning-filled","warning","watch","watermelon","wind-power","zoom-in","zoom-out"]

const addEvent = () => {
  console.log("add-event");
}

/**
 * Copy code
 */
const copyCode = async (icon: string, el: boolean) => {
  try {
    await toClipboard(el ? `<el-icon name="${icon}"></el-icon>` : `<oga-icon name="${icon}"></oga-icon>`);
    ElMessage({
      message: `Copied [ ${icon} ] to clipboard`,
      type: "success",
    });
  } catch (e) {
    console.error(e);
  }
};
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
  .el-icon {
    color: #606266;
    font-size: 1.75rem;
  }
  p {
    font-size: 12px;
  }
}
</style>
