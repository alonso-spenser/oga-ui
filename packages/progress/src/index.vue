<template>
  <div class="demo-progress">
    <el-progress :percentage="percentageVal" v-bind="$attrs" :color="customColorMethod" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  percentage: {
    type: Number,
    default: 0
  },
  animationTime: {
    type: Number,
    default: 3000
  },
  isAnimation: {
    type: Boolean,
    default: false
  }
})

const percentageVal = ref<number>(0)

const customColorMethod = (percentage: number) => {
  if (percentage < 30) {
    return '#909399'
  }
  if (percentage < 70) {
    return '#e6a23c'
  }
  return '#67c23a'
}

onMounted(() => {
  const t = Math.ceil(props.animationTime / props.percentage)
  const timer = setInterval(() => {
    percentageVal.value += 1
    if (percentageVal.value >= props.percentage || percentageVal.value >= 100) {
      percentageVal.value = props.percentage >= 100 ? 100 : props.percentage
      clearInterval(timer)
    }
  }, t);
})
</script>

<style lang="scss" scoped>
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
</style>
