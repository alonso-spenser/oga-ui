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
    <oga-table v-model="pageResult" v-bind="paginationState" @paging="getData">
    </oga-table>
  </oga-page>
</template>

<script setup lang="tsx">
import { usePageState } from "@/plugins/page-state";
import { ElButton } from "element-plus";
import i18n from "@/plugins/i18n/base";
import {
  OrganizeEmployeeModel,
  useOrganizeEmployeeStore,
} from "@/stores/page/organize-employee-store";
import { fetchOrganizeEmployeePaging } from "@/plugins/organize";
import { ColumnType } from "@/stores/type/page-type";

const { state, pageState, pageQueryState, pageResult, paginationState } =
  usePageState<OrganizeEmployeeModel>();
const organizeEmployeeStore = useOrganizeEmployeeStore();

console.log(
  organizeEmployeeStore.pageQueryState,
  organizeEmployeeStore.normalQueryState,
);

/**
 * Load data from cache
 */
pageState.loadCache(
  organizeEmployeeStore.pageQueryState,
  organizeEmployeeStore.normalQueryState,
);

/**
 * Update Pagination
 */
pageState.updatePaginationState({
  actionList: {
    rowClick: (row: OrganizeEmployeeModel, column: any) => {
      columnEvents(row, column);
    },
    delete: {
      icon: "",
      label: i18n.global.t("action.delete.button"),
      onClick: (rows: Array<OrganizeEmployeeModel>) => {
        // console.log("delete rows:");
        // deleteEmployee(rows)
      },
    },
  },
  columnList: [
    {
      prop: "account",
      width: 150,
      fixed: true,
      label: i18n.global.t("organize.employee.tableHeader.account"),
    },
    {
      prop: "address",
      label: i18n.global.t("organize.employee.tableHeader.address"),
    },
    {
      prop: "areaCode",
      label: i18n.global.t("organize.employee.tableHeader.areaCode"),
    },
    {
      prop: "avatar",
      width: 100,
      config: {
        radius: 9,
        fit: "cover",
      },
      type: ColumnType.Image,
      label: i18n.global.t("organize.employee.tableHeader.avatar"),
    },
    {
      prop: "imageList",
      type: ColumnType.Album,
      width: 100,
      config: {
        radius: 25,
        fit: "cover",
      },
      stop: true,
      className: "stop",
      label: i18n.global.t("organize.employee.tableHeader.avatar"),
    },
    {
      prop: "chest",
      width: 100,
      type: ColumnType.Number,
      config: {
        format: "###.###",
      },
      label: i18n.global.t("organize.employee.tableHeader.chest"),
    },
    {
      prop: "cup",
      type: ColumnType.Number,
      config: {
        format: "KMBT",
      },
      label: i18n.global.t("organize.employee.tableHeader.cup"),
    },
    {
      prop: "cup",
      width: 150,
      type: ColumnType.Number,
      config: {
        format: "fixed",
        digit: 3,
      },
      label: i18n.global.t("organize.employee.tableHeader.cup"),
    },
    {
      prop: "dateOfBirth",
      width: 150,
      type: ColumnType.Date,
      config: {
        format: "yyyy年MM月dd日",
      },
      label: i18n.global.t("organize.employee.tableHeader.dateOfBirth"),
    },
    {
      prop: "expirationDate",
      width: 240,
      type: ColumnType.Datetime,
      config: {
        format: "yyyy年MM月dd日 hh时mm分ss秒",
      },
      label: i18n.global.t("organize.employee.tableHeader.expirationDate"),
    },
    {
      prop: "email",
      label: i18n.global.t("organize.employee.tableHeader.email"),
    },
    {
      prop: "firstName",
      label: i18n.global.t("organize.employee.tableHeader.firstName"),
    },
    {
      prop: "height",
      label: i18n.global.t("organize.employee.tableHeader.height"),
    },
    {
      prop: "hip",
      label: i18n.global.t("organize.employee.tableHeader.hip"),
    },
    {
      prop: "lastName",
      label: i18n.global.t("organize.employee.tableHeader.lastName"),
    },
    {
      prop: "middleName",
      label: i18n.global.t("organize.employee.tableHeader.middleName"),
    },
    {
      prop: "mobile",
      label: i18n.global.t("organize.employee.tableHeader.mobile"),
    },
    {
      prop: "nationality",
      label: i18n.global.t("organize.employee.tableHeader.nationality"),
    },
    {
      prop: "nationalityId",
      label: i18n.global.t("organize.employee.tableHeader.nationalityId"),
    },
    {
      prop: "onboardingTime",
      label: i18n.global.t("organize.employee.tableHeader.onboardingTime"),
    },
    {
      prop: "organizeId",
      label: i18n.global.t("organize.employee.tableHeader.organizeId"),
    },
    {
      prop: "password",
      label: i18n.global.t("organize.employee.tableHeader.password"),
    },
    {
      prop: "position",
      label: i18n.global.t("organize.employee.tableHeader.position"),
    },
    {
      prop: "referId",
      label: i18n.global.t("organize.employee.tableHeader.referId"),
    },
    {
      prop: "referName",
      label: i18n.global.t("organize.employee.tableHeader.referName"),
    },
    {
      prop: "resign",
      label: i18n.global.t("organize.employee.tableHeader.resign"),
    },
    {
      prop: "salt",
      label: i18n.global.t("organize.employee.tableHeader.salt"),
    },
    {
      prop: "sex",
      label: i18n.global.t("organize.employee.tableHeader.sex"),
    },
    {
      prop: "skinColor",
      label: i18n.global.t("organize.employee.tableHeader.skinColor"),
    },
    {
      prop: "state",
      width: 150,
      type: ColumnType.Switch,
      config: {
        inactiveValue: 0,
        activeValue: 1,
        inlinePrompt: true,
        activeText: "活动进行中",
        inactiveText: "活动结束",
      },
      label: i18n.global.t("organize.employee.tableHeader.state"),
    },
    {
      prop: "tiktokAccount",
      label: i18n.global.t("organize.employee.tableHeader.tiktokAccount"),
    },
    {
      prop: "tiktokName",
      label: i18n.global.t("organize.employee.tableHeader.tiktokName"),
    },
    {
      prop: "timeOfLeaving",
      label: i18n.global.t("organize.employee.tableHeader.timeOfLeaving"),
    },
    {
      prop: "timeZoneId",
      label: i18n.global.t("organize.employee.tableHeader.timeZoneId"),
    },
    {
      prop: "userRole",
      label: i18n.global.t("organize.employee.tableHeader.userRole"),
    },
    {
      prop: "waist",
      label: i18n.global.t("organize.employee.tableHeader.waist"),
    },
    {
      prop: "weight",
      label: i18n.global.t("organize.employee.tableHeader.weight"),
    },
    {
      prop: "whatsApp",
      label: i18n.global.t("organize.employee.tableHeader.whatsApp"),
    },
    {
      label: "",
      width: 150,
      type: ColumnType.Button,
      group: [
        {
          icon: "delete",
          circle: true,
          round: true,
          label: "",
          disabled: false,
          onClick: (row) => {
            console.log(row);
          },
        },
        {
          icon: "edit",
          circle: true,
          round: true,
          label: "",
          disabled: false,
          onClick: (row) => {
            console.log(row);
          },
        },
      ],
    },
  ],
  /**
   * Data is empty
   */
  empty: {
    content: i18n.global.t("organize.employee.empty.content"),
    buttonLabel: i18n.global.t("organize.employee.empty.buttonLabel"),
    onClick: () => {
      //addEmployeeDrawer()
    },
  },
  /**
   * Row Highlight Class
   * @param row Row data
   */
  rowsClassName: (row: OrganizeEmployeeModel) => {
    // return row.state === 0? 'row-text-enable': ''
    return "";
  },
});

const addDict = () => {
  console.log("addDict");
};

const columnEvents = (row: any, column: any) => {
  console.log("columnKey", column.className);
};

/**
 * Get data
 */
const getData = async () => {
  await pageState.handleResponse<OrganizeEmployeeModel>(
    fetchOrganizeEmployeePaging({
      ...pageQueryState,
      current: pageResult.value.current,
      size: pageResult.value.size,
    }),
  );
};

const handleEdit = (row) => {
  console.log("Editing:", row.name);
};

const handleDelete = (row) => {
  console.log("Deleting:", row.name);
};
getData();
</script>
<style scoped lang="scss"></style>
