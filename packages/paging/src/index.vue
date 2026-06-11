<template>
  <div class="oga-table" v-loading="model.loading">
    <div class="oga-table-content" v-if="model.records.length > 0">
      <el-row class="oga-table-row" :style="{'--span': model.gutter??20}" :gutter="model.gutter??20">
        <el-col class="oga-table-col" :span="model.span??12" v-for="item in model.records">
          <slot :row="item"></slot>
        </el-col>
      </el-row>
    </div>
    <el-empty :description="model.empty?.content ?? i18n.global.t('notData')" v-else>
      <el-button
          type="text"
          v-if="model.empty"
          @click="emptyEvent"
      >
        {{ model.empty?.buttonLabel??'' }}
      </el-button>
    </el-empty>
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
import {createPagingState, type PagingState} from "./paging-type"
import i18n from "../../i18n/base";

/**
 * Model
 */
const model = defineModel<PagingState>({ default: createPagingState })

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
 * empty content event
 */
const emptyEvent = () => {
  if(model.value !== undefined) {
    if (model.value.empty && model.value.empty.onClick && typeof (model.value.empty.onClick) === 'function') {
      model.value.empty.onClick.call(this)
    }
  }
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
