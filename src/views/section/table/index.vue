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
    <oga-table v-model="model" @paging="getData"> </oga-table>
  </oga-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { tableParameter, type TableParameterState } from "@/plugins/page.ts";
import i18n from "@/plugins/i18n/base";

let dataConfig = {
  actionList: {
    rowClick: (row: any, column: any) => {
      columnEvents(row, column);
    },
    delete: {
      icon: "",
      label: "删除",
      onClick: (rows: Array<any>) => {
        console.log("delete rows:");
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
      onClick: (rows) => {
        this.goodsClone(rows);
      },
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
let model = ref<TableParameterState>();
model.value = {
  ...tableParameter,
  columnList: dataConfig.columnList,
  actionList: dataConfig.actionList,
  empty: dataConfig.empty,
  pageSize: 20,
  index: false,
  border: true,
  card: true,
};

const addDict = () => {
  console.log("addDict");
};

const columnEvents = (row: any, column: any) => {
  console.log("columnEvents", row, column);
};
const getData = () => {
  model.value.recordCount = 300;
  model.value.dataset = [];
  for (let i = 1; i <= model.value.pageSize; i++) {
    let c = i * model.value.pageIndex * model.value.pageSize;
    let item = {
      id: i.toString(),
      key: c,
      parentId: "parentId" + c,
      sortIndex: c,
      value:
        "value base.dict.empty.content base.dict.empty.content base.dict.empty.content  base.dict.empty.content base.dict.empty.content base.dict.empty.content " +
        c,
    };
    model.value.dataset.push(item);
  }
  setTimeout(() => {}, 3000);

  model.value.loading = false;
  model.value.firstLoading = false;
};
getData();
</script>
<style scoped lang="scss"></style>
