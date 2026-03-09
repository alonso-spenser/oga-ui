<template>
  <div class="oga-table">
    <template
        v-if="model.records.length === 0 && empty && empty.content && model.firstLoading"
    >
      <el-empty :description="i18n.global.t('notData')">
        {{ empty.content }}
        <el-button
            type="text"
            @click="emptyEvent"
        >
          {{ empty.buttonLabel }}
        </el-button>
      </el-empty>
    </template>
    <template v-else>
      <div class="oga-table-content">
        <el-table
            ref="ogaTable"
            :data="model.records"
            :stripe="stripe"
            :border="border"
            v-loading="model.loading"
            :row-class-name="tableRowClassName"
            :header-cell-class-name="headerCellClassName"
            @selection-change="multiSelectEvent"
            @row-click="rowClick"
            :row-style="rowClass"
        >
          <el-table-column
              v-if="multiSelect"
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
              v-if="index"
              label="NO."
              type="index"
              width="50"
              align="center"></el-table-column>
          <template v-for="(column, index) in columnList">
            <el-table-column
                :prop="column.prop"
                :align="column.align || 'left'"
                :header-align="column.headerAlign || ''"
                :label-class-name="column.labelClassName || ''"
                :width="column.width"
                :label="column.label"
                :class-name="column.className || ''"
                :sortable="column.sortable"
                :column-key="column.prop"
                :fixed="column.fixed">
              <template #header="scope">
                <span v-html="renderHeader(column.label)"></span>
              </template>
              <template #default="scope">
                <template v-if="column.type === ColumnType.Switch">
                  <el-switch
                      v-model="scope.row[column.prop]"
                      v-bind="column.config"
                      @click.native="columnEvent($event, scope.row, column.onClick)"
                  >
                  </el-switch>
                </template>
                <template v-else-if="column.type === ColumnType.Image">
                  <el-image
                      :preview-teleported="true"
                      :hide-on-click-modal="true"
                      show-progress
                      loading="lazy"
                      :preview-src-list="isNotEmpty(scope.row[column.prop]) ? [scope.row[column.prop]] : []"
                      :style="getBorderRadius(column.config.radius??0)" :src="scope.row[column.prop]"
                      :fit="isNotEmpty(column.config.fit) ? column.config.fit : 'cover'"
                  >
                    <template #error>
                      <img :src="placeholder"
                           class="el-image__inner"
                           style="object-fit: fill;" />
                    </template>
                  </el-image>
                </template>
                <template v-else-if="column.type === ColumnType.Album">
                  <el-image
                      :preview-teleported="true"
                      :hide-on-click-modal="true"
                      show-progress
                      loading="lazy"
                      :preview-src-list="getImageList(scope.row[column.prop])"
                      :style="getBorderRadius(column.config.radius??0)"
                      :src="getFirstImage(scope.row[column.prop])"
                      :fit="isNotEmpty(column.config.fit) ? column.config.fit : 'cover'"
                  >
                    <template #error>
                      <img :src="placeholder"
                           class="el-image__inner"
                           style="object-fit: fill;" />
                    </template>
                  </el-image>
                </template>
                <template v-else-if="column.type === ColumnType.Date">
                  {{ timestampToDate(scope.row[column.prop], column.config.format ?? '') }}
                </template>
                <template v-else-if="column.type === ColumnType.Datetime">
                  {{ timestampToDatetime(scope.row[column.prop], column.config.format ?? '') }}
                </template>
                <template v-else-if="column.type === ColumnType.Button">
                    <el-button
                        v-for="(btn, i) in column.group"
                        :key="i"
                        :type="btn.type"
                        :disabled="btn.disabled"
                        :plain="btn.plain"
                        :circle="btn.circle"
                        :round="btn.round"
                        :class="btn.className || ''"
                        @click.stop="btn.onClick(scope.row, scope.$index)"
                    >
                      <template #default>
                        <oga-icon :name="btn.icon" v-if="btn.icon"></oga-icon>
                        <template v-if="btn.label">
                          {{ btn.label }}
                        </template>
                      </template>
                    </el-button>
                </template>
                <template v-else-if="column.render">
                  <component :is="column.render(scope.row)"></component>
                </template>
                <template v-else-if="column.type === ColumnType.Number">
                  <template v-if="column.config.format === '###.###'">
                    {{formatNumberLocation(scope.row[column.prop])}}
                  </template>
                  <template v-else-if="column.config.format === 'KMBT'">
                    {{formatNumberLocation(scope.row[column.prop])}}
                  </template>
                  <template v-else-if="column.config.format === 'fixed'">
                    {{scope.row[column.prop].toFixed(column.config.digit??0)}}
                  </template>
                  <template v-else>
                    {{scope.row[column.prop]}}
                  </template>
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
              <template v-for="(o, key) in actionList">
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
          :current-page="model.current"
          :page-size="model.size"
          :layout="pageLayout"
          :page-sizes="pageSizes"
          :total="model.total"
          @current-change="pageChange"
          @size-change="pageSizeChange"
          v-if="paginationSection && model.total > model.size"
      >
      </el-pagination>
    </template>
  </div>
</template>
<script setup lang="ts">
import {ArrowDown} from '@element-plus/icons-vue'
import type {TableColumnCtx} from "element-plus";
import {defineEmits, ref} from "vue";
import i18n from "../../i18n/base";
import {
  formatNumber,
  formatNumberLocation,
  isFunction,
  isNotEmpty,
  timestampToDate,
  timestampToDatetime
} from "../../plugins/utility";
import placeholder from './img/placeholder.jpg'
import OgaIcon from "../../iconfont/src/iconFont.vue";
import {ColumnType, type ImageState, type PaginationParameterState, type PaginationState} from "./table"


/**
 * Props
 */
const props =  defineProps<PaginationParameterState>()

/**
 * Model
 */
const model = defineModel<PaginationState>()

/**
 * Selected items in the table.
 */
const selectedItems = ref<Array<any>>([])

/**
 * Table instance
 */
const ogaTable = ref(null);

/**
 * Bulk operation instance
 */
const bulkOperation = ref(null);

/**
 * Emit event
 */
const emit = defineEmits(['paging'])

/**
 * Row class name
 * @param row Row data
 * @returns {string}
 */
const tableRowClassName = ({ row: object, rowIndex: number }) => {
  // if (props.rowsClassName && typeof (props.rowsClassName) === 'function') {
  //   return props.rowsClassName.call(this, row, rowIndex)
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
  const s = label.split('-')
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
    const el = ogaTable.value.$refs.headerWrapper
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
const rowClick = (row: any, column: TableColumnCtx, event: { cancelBubble: boolean; }) => {
  event.cancelBubble = true
  if (props === undefined || column.className === 'stop') {
    return
  }
  if (props.actionList && props.actionList["update"]) {
    const action = props.actionList.update.onClick
    if (isFunction(action)) {
      action.call(this, row, column)
    }
  }
  if (props.actionList.rowClick && isFunction(props.actionList.rowClick)) {
    props.actionList.rowClick.call(this, row, column)
  }
}

/**
 * Highlight background in row selection
 * @param row Row data
 * @returns {{"background-color": string}}
 */
const rowClass = ({ row }) => {
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
 * 图片组
 * @param data
 */
const getImageList = (data?: Array<ImageState>) => {
  return data ? data.map(i => i.url) : []
}
/**
 * 图片组
 * @param data
 */
const getFirstImage = (data?: Array<ImageState>) => {
  return data && data.length ? data[0].url : ''
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
  if (props.actionList[command] && selectedItems.value.length > 0) {
    const action = props.actionList[command].onClick
    if (action && typeof (action) === 'function') {
      action.call(this, command === 'update' ? selectedItems.value[0] : selectedItems.value)
    }
  }
}

/**
 * empty content event
 */
const emptyEvent = () => {
  if(props !== undefined) {
    if (props.empty && props.empty.onClick && typeof (props.empty.onClick) === 'function') {
      props.empty.onClick.call(this)
    }
  }
}

/**
 * Page index change
 * @param index page index
 */
const pageChange = (index: number) => {
  if(props !== undefined) {
    model.value.current = index;
    emit('paging', false)
  }
}

/**
 * Page size change
 * @param size Page size
 */
const pageSizeChange = (size: number) => {
  if(props !== undefined) {
    model.value.size = size;
    emit('paging', false)
  }
}
</script>

<style scoped lang="scss">
@use "../../style/index.scss" as var;
</style>