export default {
  enumerate: {
    contentQuality: {
      0: "High quality",
      1: "Medium quality",
      2: "Low quality",
    },
    gender: [
      {
        value: 0,
        label: "Female",
      },
      {
        value: 1,
        label: "Male",
      },
    ],
    whether: [
      {
        value: 0,
        label: "No",
      },
      {
        value: 1,
        label: "Yes",
      },
    ],
    defaultState: [
      {
        value: 0,
        label: "",
      },
      {
        value: 1,
        label: "√",
      },
    ],
    state: [
      {
        value: 0,
        label: "Unavailable",
      },
      {
        value: 1,
        label: "Available",
      },
    ],
    vpnState: [
      {
        value: 0,
        label: "Available",
      },
      {
        value: 1,
        label: "Used",
      },
      {
        value: 2,
        label: "Expired",
      },
    ],
    accountState: [
      {
        value: 0,
        label: "Unavailable",
      },
      {
        value: 1,
        label: "Managed",
      },
      {
        value: 2,
        label: "Live",
      },
      {
        value: 3,
        label: "Paused",
      },
    ],
    payState: [
      {
        value: 0,
        label: "Pay In",
      },
      {
        value: 1,
        label: "Pay Out",
      },
    ],
    vpnType: [
      {
        value: 0,
        label: "Live",
      },
      {
        value: 1,
        label: "Operation",
      },
    ],
    skinColorOps: ["Black", "Light black", "Brown", "Yellow", "White"],
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
    shopType: [
      {
        id: 1,
        label: "B2C Page",
      },
      {
        id: 2,
        label: "B2B Page",
      },
      {
        id: 3,
        label: "B2B Site",
      },
      {
        id: 4,
        label: "B2C Shop",
      },
    ],
    sectionGroup: [
      {
        id: 1000,
        label: "Page Section",
      },
      {
        id: 2000,
        label: "Global Section",
      },
      {
        id: 3000,
        label: "Section",
      },
    ],
  },
};
