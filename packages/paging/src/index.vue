<template>
  <div class="oga-table" v-loading="model.loading">
    <div class="oga-table-content">
      <el-row class="oga-table-row" :style="{'--span': model.gutter??20}" :gutter="model.gutter??20">
        <el-col class="oga-table-col"  :span="model.span??12" v-for="item in model.records">
          <slot :item="item"></slot>
        </el-col>
      </el-row>
    </div>
    <el-pagination
        :current-page="model.current"
        :page-size="model.size"
        :layout="model.pageLayout"
        :page-sizes="model.pageSizes"
        :total="model.total"
        @current-change="pageChange"
        @size-change="pageSizeChange"
        v-if="model.total > model.size"
    >
    </el-pagination>
  </div>
</template>
<script setup lang="ts">
import {defineEmits} from "vue";
import {type PagingState} from "./paging-type"

/**
 * Model
 */
const model = defineModel<PagingState>()

/**
 * Emit event
 */
const emit = defineEmits(['paging'])

/**
 * Page index change
 * @param index page index
 */
const pageChange = (index: number) => {
  model.value.current = index;
  emit('paging', false)
}

/**
 * Page size change
 * @param size Page size
 */
const pageSizeChange = (size: number) => {
  model.value.size = size;
  emit('paging', false)
}
</script>

<style scoped lang="scss">
@use "../../style/index.scss" as var;
.oga-table-row{
  .oga-table-col{
    //margin-top: calc(var(--span) * 0.5px);
    margin-bottom: calc(var(--span) * 1px);
  }
}
</style>