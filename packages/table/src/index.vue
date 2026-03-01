<template>
  <div class="oga-table">
    <template
        v-if="model.dataset.length === 0 && model.empty && model.empty.content && model.firstLoading"
    >
      <el-empty :description="i18n.global.t('notData')">
        {{ model.empty.content }}
        <el-button
            type="text"
            @click="emptyEvent"
        >
          {{ model.empty.buttonLabel }}
        </el-button>
      </el-empty>
    </template>
    <template v-else>
      <div class="oga-table-content">
        <el-table
            ref="ogaTable"
            v-loading="model.loading"
            :data="model.dataset"
            :stripe="model.stripe"
            :border="model.border"
            :row-class-name="tableRowClassName"
            :header-cell-class-name="headerCellClassName"
            @selection-change="multiSelectEvent"
            @row-click="rowClick"
            :row-style="rowClass"
        >
          <el-table-column
              v-if="model.multiSelect"
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
              v-if="model.index"
              label="NO."
              type="index"
              width="50"
              align="center"></el-table-column>
          <template v-for="(column, index) in model.columnList">
            <el-table-column
                :prop="column.prop"
                :align="column.align || 'left'"
                :header-align="column.headerAlign || ''"
                :label-class-name="column.labelClassName || ''"
                :width="column.width"
                :label="column.label"
                :class-name="column.className || ''"
                :sortable="column.sortable"
                :fixed="column.fixed">
              <template #header="scope">
                <span v-html="renderHeader(column.label)"></span>
              </template>
              <template #default="scope">
                <template v-if="column.switch">
                  <el-switch
                      v-model="scope.row[column.prop]"
                      :active-value="column.switchActive"
                      :inactive-value="column.switchInactive"
                      active-color="#ff0000"
                      :active-text="column.activeText"
                      :inactive-text="column.inactiveText"
                      :inline-prompt="column.inlinePrompt"
                      @click.native="columnEvent($event, scope.row, column.onClick)"
                  >
                  </el-switch>
                </template>
                <template v-else-if="column.image">
                  <el-image :style="getBorderRadius(column.radius)" :src="scope.row[column.prop]" fit="cover">
                    <template #error>
                      <img :src="placeholder"
                           class="el-image__inner"
                           style="object-fit: fill;" />
                    </template>
                  </el-image>
                </template>
                <template v-else-if="column.dataType === 'date'">
                  {{ timestampToDate(scope.row[column.prop]) }}
                </template>
                <template v-else-if="column.dataType === 'datetime'">
                  {{ timestampToDatetime(scope.row[column.prop], column.dataFormat) }}
                </template>
                <template v-else-if="column.dataType === 'dateFull'">
                  {{ timestampToDatetime(scope.row[column.prop]) }}
                </template>
                <template v-else-if="column.render">
                  <component :is="column.render(scope)"></component>
                </template>
                <template v-else>
                  {{ scope.row[column.prop] }}
                </template>
              </template>
            </el-table-column>
          </template>
        </el-table>
        <div
            class="oga-table-batch-operation"
            ref="bulkOperation"
            v-show="selectedItems.length > 0"
        >
          <el-dropdown
              @command="batchOperation"
              size="large"
              placement="bottom-start">
            <div class="el-dropdown-link">
              <div>
                {{i18n.global.t('select.multiple')}}
                <b>{{selectedItems.length}}</b>
                {{ i18n.global.t('select.item') }}
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </div>
            </div>
            <template #dropdown>
              <template v-for="(o, key) in model.actionList">
                <template v-if="!o.invisible && typeof (o) !== 'function'">
                  <el-dropdown-item
                      v-if="key === 'update'"
                      :command="key"
                      size="large"
                      :key="`action-${key}`"
                      :disabled="selectedItems.length !== 1"
                      :divided="o.divided">
                    <i
                        v-if="o.icon"
                        :class="o.icon"></i>
                    {{ o.label }}
                  </el-dropdown-item>
                  <el-dropdown-item
                      size="large"
                      v-else-if="key === 'delete'"
                      :command="key"
                      :key="`action-${key}`"
                      :disabled="selectedItems.length < 1"
                      :divided="o.divided">
                    <oga-icon
                        :name="o.icon"
                        v-if="isNotEmpty(o.icon)">
                    </oga-icon>
                    {{ o.label }}
                  </el-dropdown-item>
                  <el-dropdown-item
                      v-else
                      size="large"
                      :command="key"
                      :key="`actions-${key}`"
                      :divided="o.divided">
                    <i
                        v-if="o.icon"
                        :class="o.icon"></i>
                    {{ o.label }}
                  </el-dropdown-item>
                </template>
              </template>
            </template>
          </el-dropdown>
        </div>
      </div>
      <el-pagination
          :background="false"
          :current-page="model.pageIndex"
          :page-size="model.pageSize"
          :layout="model.pageLayout"
          :page-sizes="model.pageSizes"
          :total="model.recordCount"
          @current-change="pageChange"
          @size-change="pageSizeChange"
          v-if="model.paginationSection && model.recordCount > model.pageSize"
      >
      </el-pagination>
    </template>
  </div>
</template>
<script setup lang="ts">
import { ArrowDown, Picture as IconPicture } from '@element-plus/icons-vue'
import { defineEmits, ref } from "vue";
import i18n from "../../i18n/base";
import {isNotEmpty, isEmpty, isFunction, filterHTML, timestampToDate, timestampToDatetime} from "../../plugins/utility";
import placeholder from './img/placeholder.jpg'
import OgaIcon from "../../iconfont/src/iconFont.vue";
import {type PaginationParameterState, createPaginationParameter} from  "./table"

interface ButtonGroupState {
  icon: string,
  circle: boolean,
  name: string,
  disabled: boolean,
  onClick: Function | null
}
interface ColumnState {
  prop: string;
  label: string;
  align: string;
  width: string | number;
  sortable: boolean;
  fixed: boolean;
  render: Function;
  image: boolean;
  switch: boolean;
  button: boolean;
  svg: string;
  switchActive: number;
  switchInactive: number;
  onClick: Function | null;
  dataType: string;
  dataFormat: string;
  headerAlign: string;
  labelClassName:string;
  className: string;
  group: Array<ButtonGroupState>;
}

let selectedItems = ref<Array<any>>([])
const model = defineModel<PaginationParameterState<any>>()
const ogaTable = ref(null);
const bulkOperation = ref(null);
const emit = defineEmits(['update:modelValue', 'paging'])

/**
 * Row class name
 * @param row Row data
 * @param rowIndex Row index
 * @returns {string}
 */
const tableRowClassName = ({ row: object, rowIndex: number }) => {
  // if (model.value.rowsClassName && typeof (model.value.rowsClassName) === 'function') {
  //   return model.value.rowsClassName.call(this, row, rowIndex)
  // }
  return ''
}


/**
 * Cell class name
 * @param row Row data
 * @param rowIndex
 * @returns {string}
 */
const headerCellClassName = ({ row, column }) => {
  if (isNotEmpty(column.label) && column.label.indexOf('-') > -1) {
    return 'el-table__layers'
  }
  return ''
}

/**
 * Render header
 */
const renderHeader = (label: string) => {
  let s = label.split('-')
  return s.join("<br/>")
}

/**
 * Get border radius style
 * @param radius
 */
const getBorderRadius = (radius: number): string => {
  return radius > 0 ? `border-radius: ${radius}px;` : ''
}


/**
 * Multi select event
 * @param rows
 */
const multiSelectEvent = (rows: Array<any>) => {
  if (ogaTable.value !== null && bulkOperation.value !== null) {
    let el = ogaTable.value.$refs.headerWrapper
    bulkOperation.value.style.height = (el.offsetHeight - 1) + 'px'
    selectedItems.value = rows
  }
}

/**
 * Row click event
 * @param row Row data
 * @param column Click column
 * @param event Click event
 */
const rowClick = (row: any, column: any, event: { cancelBubble: boolean; }) => {
  event.cancelBubble = true
  if (model.value === undefined) {
    return
  }
  if (model.value.actionList && model.value.actionList["update"]) {
    const action = model.value.actionList.update.onClick
    if (isFunction(action)) {
      action.call(this, row, column)
    }
  }
  if (model.value.actionList.rowClick && isFunction(model.value.actionList.rowClick)) {
    model.value.actionList.rowClick.call(this, row, column)
  }
}

/**
 * Highlight background in row selection
 * @param row Row data
 * @param rowIndex Row index
 * @returns {{"background-color": string}}
 */
const rowClass = ({ row, rowIndex }) => {
  let exist = false
  selectedItems.value.forEach((o) => {
    if (o === row) {
      exist = true
    }
  })
  if (exist) {
    return {
      'background-color': '#edf5fe'
    }
  }
}
/**
 * Default image
 */
const defaultImage = (img: string | null | undefined) => {
  return isEmpty(img) ? placeholder : img
}

/**
 * 列的状态
 * @param column
 * @param row
 */
const rowVisible = (row, column) => {
  if (column.visible === undefined || column.visibleValue === undefined) {
    return true
  }
  return row[column.visible] === column.visibleValue
}

/**
 * SVG
 */
const getSvg =(value:string) => {
  if (isEmpty(value)) {
    return placeholder
  }
  return filterHTML(value, 'svg', 'width|height|class|fill')
}

/**
 * 列事件
 * @param event
 * @param row
 * @param func
 */
const columnEvent = (event, row: object, func: Function) => {
  event.cancelBubble = true
  if (func && typeof (func) === 'function') {
    func.call(this, row)
  }
}

/**
 * Butch operation event
 */
const batchOperation = (command: string) => {
  if (model.value.actionList[command] && selectedItems.value.length > 0) {
    const action = model.value.actionList[command].onClick
    if (action && typeof (action) === 'function') {
      action.call(this, command === 'update' ? selectedItems.value[0] : selectedItems.value)
    }
  }
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
 * Page index change
 * @param index page index
 */
const pageChange = (index: number) => {
  if(model.value !== undefined) {
    model.value.pageIndex = index
    emit('update:modelValue', model)
    emit('paging', false)
  }
}

/**
 * Page size change
 * @param size Page size
 */
const pageSizeChange = (size: number) => {
  if(model.value !== undefined) {
    model.value.pageSize = size
    model.value.pageIndex = 1
    emit('update:modelValue', model)
    emit('paging', ref(size))
  }
}

</script>

<style scoped lang="scss">
@use "../../style/index.scss" as var;
</style>