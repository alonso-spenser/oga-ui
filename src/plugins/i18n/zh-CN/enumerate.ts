export default {
  enumerate: {
    contentQuality: {
      0: "High quality",
      1: "Medium quality",
      2: "Low quality",
    },
    /**
     * 审核状态
     */
    auditState: {
      "0": "已确认",
      "1": "待确认",
      "2": "已驳回",
    },
    stateClassName: {
      "0": "text-success",
      "1": "text-warning",
      "2": "text-danger",
      "3": "text-secondary",
    },
    /**
     * 工作单状态
     */
    worksheetState: {
      "-1": "全部",
      "0": "审核中",
      "1": "进行中",
      "2": "已暂停",
      "7": "已驳回",
      "9": "已完成",
    },
    worksheetClassName: {
      "0": "text-info",
      "1": "text-success",
      "2": "text-warning",
      "7": "text-danger",
      "9": "text-secondary",
    },
    urgentState: {
      "0": "Normal",
      "1": "Urgent",
      "2": "Unusually urgent",
    },
    /**
     * 站点类型
     */
    siteType: [
      {
        id: 1,
        label: "B2C单页",
      },
      {
        id: 2,
        label: "B2B单页",
      },
      {
        id: 3,
        label: "企业网站",
      },
      {
        id: 4,
        label: "在线商店",
      },
    ],
    sectionGroup: [
      {
        id: 1000,
        label: "页面组件",
      },
      {
        id: 2000,
        label: "全局组件",
      },
      {
        id: 3000,
        label: "普通组件",
      },
      {
        id: 4000,
        label: "商详设计",
      },
    ],
  },
};
