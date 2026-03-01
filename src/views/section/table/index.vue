<template>
  <oga-page :offset="240" :percentage="100" google-style :padding="true">
    <template #header>
      <div class="oga-filter">
        <div class="oga-filter-item">
          <oga-input
            shrink
            label="Keyword"
            placeholder="Please enter keyword"
            clearable
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </oga-input>
        </div>
        <div class="oga-filter-item">
          <el-button
            icon="plus"
            type="primary"
            plain
            class="el-material-button"
          >
            Search
          </el-button>
        </div>
        <div class="oga-filter-item text-count">
          <label class="text-secondary mr-2"> Total </label>
          <label class="text-primary"> 100 </label>
        </div>
        <div class="oga-filter-item"></div>
      </div>
    </template>
    <oga-table v-model="paginationModel" @paging="getData"> </oga-table>
  </oga-page>
</template>

<script setup lang="tsx">
import { ref } from "vue";
import {
  type PaginationParameterState,
  createPaginationParameter,
} from "@/plugins/page";
import { ElButton, ElTooltip } from "element-plus";
import i18n from "@/plugins/i18n/base";

/**
 * Pagination Config
 */
const paginationConfig = {
  actionList: {
    rowClick: (row: any, column: any) => {
      columnEvents(row, column);
    },
    delete: {
      icon: "",
      label: "删除",
      onClick: (rows: Array<any>) => {
        console.log("delete rows:", rows.length);
        // this.deleteDict(rows)
      },
    },
    disable: {
      label: "article.paging.actions.disable",
      onClick: (rows) => {},
    },
    enable: {
      label: "article.paging.actions.enable",
      onClick: (rows) => {},
    },
    sticky: {
      divided: true,
      label: "article.paging.actions.sticky",
      onClick: (rows) => {},
    },
    cancelSticky: {
      label: "article.paging.actions.cancelSticky",
      onClick: (rows) => {},
    },
    addCollection: {
      divided: true,
      label: "article.paging.actions.addCollection",
      onClick: (rows) => {},
    },
    addTag: {
      label: "article.paging.actions.addTag",
      onClick: (rows) => {},
    },
    clone: {
      divided: true,
      label: "goods.paging.actions.clone.button",
      onClick: (rows) => {},
    },
  },
  columnList: [
    {
      prop: "key",
      label: i18n.global.t("base.dict.tableHeader.key"),
      fixed: "left",
      width: 100,
    },
    {
      prop: "parentId",
      label: i18n.global.t("base.dict.tableHeader.parentId"),
      width: 200,
      render: ({ row }) => (
          <div>
            <div style="color:red">111</div>
            <ElButton size="small" type="primary" onClick={() => handleEdit(row)}>
              Edit
            </ElButton>
            <ElButton size="small" type="danger" onClick={() => handleDelete(row)}>
              Delete
            </ElButton>
          </div>
      ),
    },
    {
      prop: "state",
      label: "Switch",
      width: 150,
      switch: true,
      switchActive: 0,
      switchInactive: 1,
      inlinePrompt: true,
      activeText: "活动进行中",
      inactiveText: "活动结束",
      onClick: (row) => {
        // this.goodsSticky([row.id], row.sticky, true)
      },
    },
    {
      prop: "img",
      label: "Image",
      width: 100,
      radius: 9,
      image: true,
    },
    {
      prop: "start",
      label: i18n.global.t("base.dict.tableHeader.sortIndex"),
      width: 120,
      dataType: "date",
    },
    {
      prop: "start",
      label: i18n.global.t("base.dict.tableHeader.sortIndex"),
      width: 200,
      dataType: "datetime",
      dataFormat: "yyyy年MM月dd日 hh:mm",
    },
    {
      prop: "start",
      label: i18n.global.t("base.dict.tableHeader.sortIndex"),
      width: 200,
      dataType: "dateFull",
    },
    {
      prop: "sortIndex",
      label: i18n.global.t("base.dict.tableHeader.sortIndex"),
      width: 100,
    },
    {
      prop: "value",
      label: i18n.global.t("base.dict.tableHeader.value"),
    },
  ],
  /**
   * Data is empty
   */
  empty: {
    content: i18n.global.t("base.dict.empty.content"),
    buttonLabel: i18n.global.t("base.dict.empty.buttonLabel"),
    onClick: () => {
      addDict();
    },
  },
  /**
   * Row Highlight Class
   * @param row Row data
   */
  rowsClassName: (row: any) => {
    // return row.state === 0? 'row-text-enable': ''
    return "";
  },
};

/**
 * Pagination Model
 */
const paginationModel = ref<PaginationParameterState<any>>({
  ...createPaginationParameter<any>(),
  columnList: paginationConfig.columnList,
  actionList: paginationConfig.actionList,
  empty: paginationConfig.empty,
  pageSize: 20,
  index: false,
  border: true,
  card: true,
});

const addDict = () => {
  console.log("addDict");
};

const columnEvents = (row: any, column: any) => {
  console.log("columnEvents", row, column);
};
const getData = () => {
  if (!paginationModel.value) return;
  paginationModel.value.recordCount = 300;
  paginationModel.value.dataset = [];
  for (let i = 1; i <= paginationModel.value.pageSize; i++) {
    let c =
      i * paginationModel.value.pageIndex * paginationModel.value.pageSize;
    let item = {
      id: i.toString(),
      key: c,
      state: i % 2,
      parentId: "parentId" + c,
      sortIndex: c,
      img:
        i % 3 === 0
          ? "https://s.tvagrp.com/file/2013184463368097793.webp"
          : "https://s.tvagrp.com/file/2013548252240285697.webp",
      start: 1731621717165 + i,
      value:
        "value base.dict.empty.content base.dict.empty.content base.dict.empty.content  base.dict.empty.content base.dict.empty.content base.dict.empty.content " +
        c,
    };
    paginationModel.value.dataset.push(item);
  }

  paginationModel.value.loading = false;
  paginationModel.value.firstLoading = false;
  console.log("getData", paginationModel.value.loading);
};

const handleEdit = (row) => {
  console.log('Editing:', row.name);
};

const handleDelete = (row) => {
  console.log('Deleting:', row.name);
};
getData();
</script>
<style scoped lang="scss"></style>
