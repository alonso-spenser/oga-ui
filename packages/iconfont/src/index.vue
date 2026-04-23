<template>
  <svg v-if="useSvg" class="oga-icon" aria-hidden="true" :style="css">
    <use :href="name"></use>
  </svg>
  <i v-else class="oga-icon-font" :class="name"></i>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
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
    size: {
      type: Number,
      default: 16
    }
  },
  setup(props) {
    const name = computed(() => {
      const hash = props.type === "svg" ? "#" : "";
      return `${hash}${props.prefix}-${props.name}`;
    });
    const useSvg = computed(() => {
      const type = props.type;
      return type === "svg";
    });
    const css = ref<Record<string, any>>({});
    if (props.size !== 16 && props.size > 0) {
      css.value["--icon-size"] =  props.size;
    }
    return {
      name,
      useSvg,
      css,
      msg: "Invalid icon",
    };
  },
});
</script>

<style scoped lang="scss">
.oga-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;

  font-size: calc(var(--icon-size, 16) * 1px);

}
</style>