<template>
  <svg v-if="useSvg" class="oga-icon" aria-hidden="true">
    <use :href="name"></use>
  </svg>
  <i v-else class="oga-icon-font" :class="name"></i>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import "../iconfont.js";
export default defineComponent({
  name: "ogaIcon",
  props: {
    type: {
      type: String,
      default: "svg",
    },
    name: {
      type: String,
      default: "",
      required: true,
    },
    prefix: {
      type: String,
      default: "icon",
    },
  },
  setup(props) {
    const name = computed(() => {
      let hash = props.type === "svg" ? "#" : "";
      return `${hash}${props.prefix}-${props.name}`;
    });
    const useSvg = computed(() => {
      let type = props.type;
      return type === "svg";
    });
    return {
      name,
      useSvg,
      msg: "Invalid icon",
    };
  },
});
</script>

<style scoped>
.oga-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>