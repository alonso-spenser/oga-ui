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

    <oga-paging v-model="customPageResult" @paging="getData">
      <template #default="{ item }">
        <div
          style="border: 1px solid red; padding: 20px; border-radius: 10px"
          @click="columnEvents(item)"
        >
          {{ item.account }}
        </div>
      </template>
    </oga-paging>
  </oga-page>
</template>

<script setup lang="tsx">
import { usePageState } from "@/plugins/page-state";
import i18n from "@/plugins/i18n/base";
import {
  OrganizeEmployeeModel,
  useOrganizeEmployeeStore,
} from "@/stores/page/organize-employee-store";
import { fetchOrganizeEmployeePaging } from "@/plugins/organize";
import { ElButton } from "element-plus";

const { state, pageState, pageQueryState, customPageResult } =
  usePageState<OrganizeEmployeeModel>();
const organizeEmployeeStore = useOrganizeEmployeeStore();

customPageResult.value.span = 8;
customPageResult.value.gutter = 16;

/**
 * Load data from cache
 */
pageState.loadCache(
  organizeEmployeeStore.pageQueryState,
  organizeEmployeeStore.normalQueryState,
);

const columnEvents = (row: OrganizeEmployeeModel) => {
  console.log("columnKey", row.account);
};

/**
 * Get data
 */
const getData = async () => {
  await pageState.resolveCustomResponse<OrganizeEmployeeModel>(
    fetchOrganizeEmployeePaging({
      ...pageQueryState,
      current: customPageResult.value.current,
      size: customPageResult.value.size,
    }),
  );
};

getData();
</script>
<style scoped lang="scss"></style>
