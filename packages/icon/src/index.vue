<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

const props = defineProps({
  name: {
    type: String,
    default: ""
  },
  color: {
    type: String,
    default: ""
  },
  size: {
    type: Number,
    default: 16
  }
});

const svgContent = ref("");

/**
 * load svg file
 */
const loadSvg = async () => {
  if (!props.name) return;

  try {
    const module = await import(`../svg/${props.name}.svg?raw`);
    svgContent.value = module.default;
  } catch (e) {
    console.warn(`SVG not found: ${props.name}`);
    svgContent.value = "";
  }
};

watch(() => props.name, loadSvg, { immediate: true });
</script>

<template>
  <i
      class="el-icon"
      v-html="svgContent"
  />
</template>
<style scoped lang="scss">

</style>