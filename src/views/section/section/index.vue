<script setup lang="ts">
  import { ref } from 'vue'
  const content = ref('An AI-assisted light show was one of the goodbye celebrations for Paris\' Centre Pompidou as it closed ahead of a five-year renovation.')
  const heading = ref('The places you can’t visit in 2026')
</script>

<template>
  <oga-page
      :offset="300"
      :percentage="100"
      :padding="true"
  >
    <oga-section
        :heading="heading"
        :description="content"
    >
      <div>
        As Mick Jagger famously sang, you can’t always get what you want. That applies to travel too — no matter how meticulously planned a trip, you can’t avoid bad weather, natural disasters, worker strikes and other external factors.
      </div>
      <div>
        As Mick Jagger famously sang, you can’t always get what you want. That applies to travel too — no matter how meticulously planned a trip, you can’t avoid bad weather, natural disasters, worker strikes and other external factors.
      </div>
      <div>
        As Mick Jagger famously sang, you can’t always get what you want. That applies to travel too — no matter how meticulously planned a trip, you can’t avoid bad weather, natural disasters, worker strikes and other external factors.
      </div>
      <template #header>
        <el-button>Mick Jagger</el-button>
      </template>
    </oga-section>

    <oga-section
        :heading="heading"
        :description="content"
    >
      <div>
        As Mick Jagger famously sang, you can’t always get what you want. That applies to travel too — no matter how meticulously planned a trip, you can’t avoid bad weather, natural disasters, worker strikes and other external factors.
      </div>
      <template #header>
        AI-assisted
      </template>
    </oga-section>
  </oga-page>
</template>

<style scoped lang="scss">

</style>