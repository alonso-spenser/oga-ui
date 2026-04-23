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
import { ColumnType} from "@/stores/type/page-type";
import type { FormInstance, FormRules, TableColumnCtx } from "element-plus";


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

interface DictState {
  label: string;
  value: string | number | boolean;
}

enum AccountState {
  Available = 0, Banned = 1, Pending = 2, InUse = 3,
}

const AccountStateOptions: DictState[] = [
  { label: "Available", value: AccountState.Available },
  { label: "Banned", value: AccountState.Banned },
  { label: "Pending", value: AccountState.Pending },
  { label: "In Use", value: AccountState.InUse },
];

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
      label: i18n.global.t("account.tableHeader.account"),
      fixed: true,
      width: 200,
      render: (row: OrganizeEmployeeModel) => (
          <div>
            <div class="oga-table-row">
              <el-tag size="small">{row.email}</el-tag>
            </div>
            <div class="oga-table-row">{row.account}</div>
            <div class={'oga-table-row'}>{row.email}</div>
          </div>
      ),
    },
    // {
    //   prop: "account",
    //   width: 150,
    //   type: ColumnType.Mask,
    //   config: {
    //     format: "1/3",
    //   },
    //   label: i18n.global.t("organize.employee.tableHeader.account"),
    // },
    {
      prop: "state",
      width: 70,
      label: "State",
      align: "center",
      type: ColumnType.State,
      config: {
        success: true,
        error: true,
      }
    },
    // {
    //   prop: "account",
    //   type: ColumnType.Mask,
    //   config: {
    //     format: "default",
    //   },
    //   label: i18n.global.t("organize.employee.tableHeader.address"),
    // },
    {
      label: "",
      width: 200,
      type: ColumnType.Button,
      group: [
        {
          icon: "delete",
          circle: true,
          round: true,
          label: "",
          type: "primary",
          disabled: false,
          sub: "popover",
          config: {
            title: 'Title',
            content: 'content',
            placement: 'bottom'
          },
          onClick: (row: any) => {
            console.log(row);
          },
        },
        {
          icon: "zoom-out",
          circle: true,
          round: true,
          label: "",
          disabled: false,
          sub: "confirm",
          config: {
            title: 'Title',
            content: 'content',
            placement: 'bottom'
          },
          onClick: (row: any) => {
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
          sub: "dropdown",
          actions: [
            {
              icon: 'plus',
              label: 'Logout',
              onClick: (row: any) => {
                console.log('Logout', row);
              }
            },
            {
              icon: 'plus',
              label: 'Bind PayPal',
              onClick: (row: any) => {
                console.log('Bind PayPal', row);
              }
            },
            {
              icon: 'delete',
              label: 'Delete PayPal',
              divided: true,
              onClick: (row: any) => {
                console.log('Delete PayPal', row);
              }
            }
          ]
        },
      ],
    },

    {
      prop: "areaCode",
      type: ColumnType.Click,
      label: i18n.global.t("organize.employee.tableHeader.areaCode"),
    },
    {
      prop: "avatar",
      width: 100,
      config: {
        radius: 50,
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
      width: 100,
      config: {
        format: "KMBT",
      },
      label: "KMBT",
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
      width: 150,
      type: ColumnType.Mask,
      config: {
        format: "email",
      },
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
      width: 100,
      label: i18n.global.t("organize.employee.tableHeader.sex"),
      type: ColumnType.Dictionary,
      config: {
        data: AccountStateOptions
      }
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
  console.log("Column Event: ", column.property);
};

/**
 * Get data
 */
const getData = async () => {
  await pageState.resolveResponse<OrganizeEmployeeModel>(
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
