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
            @cellClick="cellClick"
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
                :min-width="column.minWidth"
                :label="column.label"
                :class-name="isNotEmpty(column.className) ? column.className : ''"
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
                      :style="getBorderRadius(column.config?.radius??0)" :src="scope.row[column.prop]"
                      :fit="column.config?.fit?? 'cover'"
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
                      :style="getBorderRadius(column.config?.radius ?? 0)"
                      :src="getFirstImage(scope.row[column.prop])"
                      :fit="column.config?.fit ?? 'cover'"
                  >
                    <template #error>
                      <img :src="placeholder"
                           class="el-image__inner"
                           style="object-fit: fill;" />
                    </template>
                  </el-image>
                </template>
                <template v-else-if="column.type === ColumnType.Date">
                  {{ timestampToDate(scope.row[column.prop], column.config?.format ?? '') }}
                </template>
                <template v-else-if="column.type === ColumnType.Datetime">
                  {{ timestampToDatetime(scope.row[column.prop], column.config?.format ?? '') }}
                </template>
                <template v-else-if="column.type === ColumnType.Button">
                  <template v-for="(btn, i) in column.group">
                    <template v-if="btn.sub === 'popover'">
                      <el-popover
                          :title="btn.config?.title"
                          :content="btn.config?.content"
                          v-if="(btn.visible === undefined) || (btn.visible !== undefined && btn.visible(scope.row))"
                          :placement="btn.config?.placement ?? 'bottom-end'"
                      >
                        <template #reference>
                          <el-button
                              class="oga-table-button"
                              :key="i"
                              :type="btn.type"
                              :disabled="btn.disabled"
                              :plain="btn.plain"
                              :circle="btn.circle"
                              :round="btn.round"
                              :class="btn.className || ''"
                              @click.stop="btn.onClick(scope.row)"
                          >
                            <template #default>
                              <el-icon :name="btn.icon" v-if="btn.icon"></el-icon>
                              <template v-if="btn.label">
                                {{ btn.label }}
                              </template>
                            </template>
                          </el-button>
                        </template>
                      </el-popover>
                    </template>
                    <template v-else-if="btn.sub === 'dropdown'">
                      <el-dropdown class="oga-table-button">
                        <div class="el-dropdown-link">
                          <el-button
                              :key="i"
                              :type="btn.type"
                              :disabled="btn.disabled"
                              :plain="btn.plain"
                              :circle="btn.circle"
                              :round="btn.round"
                              :class="btn.className || ''"
                              @click.stop="btn.onClick(scope.row)"
                          >
                            <template #default>
                              <el-icon :name="btn.icon" v-if="btn.icon"></el-icon>
                              <template v-if="btn.label">
                                {{ btn.label }}
                              </template>
                            </template>
                          </el-button>
                        </div>
                        <template #dropdown>
                          <el-dropdown-menu>
                            <template v-for="(sub) in btn.actions??[]">
                              <el-dropdown-item
                                  v-if="(sub.visible === undefined) || (sub.visible !== undefined && sub.visible(scope.row))"
                                  :divided="sub.divided??false"
                                  @click="sub.onClick(scope.row)"
                              >
                                <el-icon :name="sub.icon" v-if="isNotEmpty(sub.icon)"></el-icon>
                                {{sub.label}}
                              </el-dropdown-item>
                            </template>
                          </el-dropdown-menu>
                        </template>
                      </el-dropdown>
                    </template>
                    <template v-else>
                      <el-button
                          :key="i"
                          :type="btn.type"
                          :disabled="btn.disabled"
                          :plain="btn.plain"
                          :circle="btn.circle"
                          :round="btn.round"
                          :class="btn.className || ''"
                          class="oga-table-button"
                          v-if="(btn.visible === undefined) || (btn.visible !== undefined && btn.visible(scope.row))"
                          @click.stop="buttonClick(btn, scope.row, scope.$index)"
                      >
                        <template #default>
                          <el-icon :name="btn.icon" v-if="btn.icon"></el-icon>
                          <template v-if="btn.label">
                            {{ btn.label }}
                          </template>
                        </template>
                      </el-button>
                    </template>
                  </template>
                </template>
                <template v-else-if="column.render">
                  <component :is="column.render(scope.row)"></component>
                </template>
                <template v-else-if="column.type === ColumnType.Number">
                  <template v-if="column.config?.format === '###.###'">
                    {{formatNumberLocation(scope.row[column.prop])}}
                  </template>
                  <template v-else-if="column.config?.format === 'KMBT'">
                    {{formatNumber(scope.row[column.prop])}}
                  </template>
                  <template v-else-if="column.config?.format === 'fixed'">
                    {{scope.row[column.prop].toFixed(column.config?.digit??0)}}
                  </template>
                  <template v-else>
                    {{scope.row[column.prop]}}
                  </template>
                </template>
                <template v-else-if="column.type === ColumnType.Mask">
                  {{ column.config?.format ==='1/3' ? maskOneThirdString(scope.row[column.prop]) : column.config?.format ==='email' ? maskEmail(scope.row[column.prop]) : maskString(scope.row[column.prop])  }}
                </template>
                <template v-else-if="column.type === ColumnType.Dictionary">
                  {{column.config?.data? getDictValue(column.config.data, scope.row[column.prop]) : scope.row[column.prop]}}
                </template>
                <template v-else-if="column.type === ColumnType.State">
                  <template v-if="scope.row[column.prop] === 1">
                    <el-icon
                        v-if="column.config?.success??true"
                        name="check"
                        style="color:var(--el-color-success)"
                    ></el-icon>
                  </template>
                  <template v-if="scope.row[column.prop] === 0">
                    <el-icon
                        v-if="column.config?.error??true"
                        name="close"
                        style="color:var(--el-color-error)"
                    ></el-icon>
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
                <el-icon name="arrow-down"></el-icon>
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
                    <el-icon
                        :name="o.icon"
                        v-if="isNotEmpty(o.icon)">
                    </el-icon>
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
import type {TableColumnCtx, TableInstance} from "element-plus";
import { ElMessage,ElMessageBox, type MessageType } from "element-plus";
import {ref} from "vue";
import i18n from "../../i18n/base";
import {
  formatNumber,
  formatNumberLocation,
  getDictValue,
  isFunction,
  isNotEmpty,
  maskEmail,
  maskOneThirdString,
  maskString,
  timestampToDate,
  timestampToDatetime
} from "../../plugins/utility";
import placeholder from './img/placeholder.jpg'
import {
  ColumnType,
  createPaginationState,
  type ButtonGroupState,
  type ColumnState,
  type ImageState,
  type PaginationParameterState,
  type PaginationState
} from "./table"
import ElIcon from "../../icon/src/index.vue";
import useClipboard from "vue-clipboard3";
const { toClipboard } = useClipboard();

/**
 * Props
 */
const props =  defineProps<PaginationParameterState>()

/**
 * Model
 */
const model = defineModel<PaginationState>({ default: createPaginationState })

/**
 * Selected items in the table.
 */
const selectedItems = ref<Array<any>>([])

/**
 * Table instance
 */
const ogaTable = ref<TableInstance | null>(null);

/**
 * Bulk operation instance
 */
const bulkOperation = ref<HTMLElement | null>(null);

/**
 * Emit event
 */
const emit = defineEmits(['paging'])

/**
 * Row class name
 * @param row Row data
 * @returns {string}
 */
const tableRowClassName = (_scope: { row: any; rowIndex: number }) => {
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
const headerCellClassName = ({ column }: { row: any; column: TableColumnCtx<any> }) => {
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
    const el = ogaTable.value.$refs.headerWrapper as HTMLElement
    bulkOperation.value.style.height = (el.offsetHeight - 1) + 'px'
    selectedItems.value = rows
  }
}

/**
 * Cell Click
 * @param row Data
 * @param column Column params
 * @param dom HTML Dom
 * @param pointerEvent Pointer Event
 */
const cellClick = (row: any, column: TableColumnCtx<any>, dom: object, pointerEvent: object) => {
  let click: ((d: any, pointerEvent?: object) => void) | null = null;
  let el = props.columnList.filter((o) => {
    return o.prop === column.property
  })
  if (el.length > 0) {
    click = el[0]?.onClick ?? null;
  }
  if (click && isFunction(click)) {
    click(row, pointerEvent)
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
  let el =  props.columnList.filter((o) => {
    return !(o.type === undefined || o.type === ColumnType.Click) && o.prop === column.property
  })
  let cp =  props.columnList.filter((o) => {
    return o.type === ColumnType.Copy && o.prop === column.property
  })
  if (cp.length > 0) {
    let c = row[column.property]
    if (c !== undefined && c !== null) {
      toClipboard(row[column.property] ?? "");
      ElMessage({
        message: i18n.global.t("copied"),
        type: "success",
      });
    }
    return;
  }
  if (el.length > 0 || column.className === 'stop') {
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
const rowClass = ({ row }: { row: any }) => {
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
    return data && data.length ? data[0]?.url ?? '' : ''
}

/**
 * 列的状态
 * @param column
 * @param row
 */
const rowVisible = (row: any, column: ColumnState) => {
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
const columnEvent = (event: MouseEvent & { cancelBubble: boolean }, row: object, func: ((row: object) => void) | null) => {
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

/**
 * Button Click
 */
const buttonClick = (btn: ButtonGroupState,row: any, index: number ) => {
  if ((btn.sub === "button" || btn.sub === undefined) && btn.onClick !== undefined) {
    btn.onClick(row, index);
  } else if (btn.sub === "confirm") {
    ElMessageBox.confirm(
        isNotEmpty(btn.config?.content) ? btn.config?.content : i18n.global.t("confirm.content"),
        isNotEmpty(btn.config?.title) ? btn.config?.title : i18n.global.t("confirm.title"),
        {
          closeOnClickModal: false,
          type: "warning",
          distinguishCancelAndClose: true,
          confirmButtonText: i18n.global.t("fileUpload.confirm"),
          cancelButtonText: i18n.global.t("fileUpload.cancel"),
        },
    ).then(() => {
      if (btn.onClick !== undefined) {
        btn.onClick(row, index);
      }
    }).catch(() => {
      if (btn.onCancel !== undefined) {
        btn.onCancel(row, index);
      }
    })
  }
}
</script>

<style scoped lang="scss">
@use "../../style/index.scss" as var;


</style>
