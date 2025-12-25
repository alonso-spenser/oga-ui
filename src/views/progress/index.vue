<template>
  <div>
    <og-progress :percentage="80"></og-progress>
    <br>
    <og-progress :percentage="50" :indeterminate="true"></og-progress>
    <br>
    <og-progress type="circle" :percentage="25"></og-progress>
    <br>
    <og-progress type="circle" :percentage="60"></og-progress>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>

</style>
