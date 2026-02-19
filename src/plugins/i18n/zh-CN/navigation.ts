export default {
  navigation: {
    aside: "导航菜单",
    async: "同步菜单",
    asyncTips: "请求已提交，系统会自动处理",
    menuType: [
      {
        value: 1,
        title: "Header 顶栏菜单",
        limit: 4,
        subheading:
          "设置网站页头的导航菜单，通过拖动可以调整排序以及父子菜单关系（最多支持 3 级菜单）",
        describe: "显示在网站页头的全局菜单",
      },
      {
        value: 2,
        limit: 1,
        title: "Footer 1 底栏菜单",
        subheading: "设置网站页脚的导航菜单，通过拖动可以调整排序",
        describe: "显示在网站页脚的全局菜单",
      },
      {
        value: 8,
        title: "Footer 2 底栏菜单",
        limit: 1,
        subheading: "设置网站页脚的导航菜单，通过拖动可以调整排序",
        describe: "显示在网站页脚的全局菜单",
      },
      {
        value: 9,
        limit: 1,
        title: "Footer 3 底栏菜单",
        subheading: "设置网站页脚的导航菜单，通过拖动可以调整排序",
        describe: "显示在网站页脚的全局菜单",
      },
      {
        value: 3,
        limit: 3,
        title: "商品列表页侧栏菜单",
        subheading:
          "设置商品列表页侧栏菜单，通过拖动可以调整排序（最多支持 3 级菜单）",
        describe: "显示在商品集合详情（即商品列表页）的全局菜单",
      },
      {
        value: 4,
        limit: 3,
        title: "文章列表页侧栏菜单",
        subheading:
          "设置文章列表页侧栏菜单，通过拖动可以调整排序（最多支持 3 级菜单）",
        describe: "显示在文章集合详情（即文章列表页）的全局菜单",
      },
    ],
    paging: {
      title: "网站导航",
      tableHeader: {
        title: "菜单名称",
        describe: "说明",
      },
    },
    update: {
      pageTitle: "网站导航",
      heading: "",
      subheading: "",
      add: "添加菜单",
      tableHeader: {
        level: "导航菜单级别",
        link: "链接地址",
        navType: "导航类型，1为顶部导航，2为底部",
        parentId: "上级编码",
        refId: "关联数据ID",
        refType: "关联数据类型",
        siteId: "网站编码",
        sort: "菜单排序",
        templateId: "模板ID",
        title: "导航名称",
      },
      header: {
        heading: "Header顶栏导航",
        subheading:
          "设置网站页头的导航菜单，通过拖动可以调整排序以及父子菜单关系",
      },
      footer: {
        heading: "Footer 底栏导航",
        subheading:
          "设置网站页脚的导航菜单，通过拖动可以调整排序（底栏导航不支持父子菜单）",
      },
      dialog: {
        heading: "编辑菜单",
      },
      entity: {
        title: {
          label: "导航名称",
          tips: "",
          placeholder: "导航名称",
          required: "请输入导航名称",
          custom: "",
        },
        link: {
          label: "链接地址",
          tips: "",
          placeholder: "链接地址",
          required: "请输入链接地址",
          custom: "",
        },
        target: {
          label: "打开方式",
          tips: "",
          placeholder: "链接打开方式",
          required: "",
          custom: "",
        },
        avatar: {
          label: "广告图片",
          tips: "",
          placeholder: "",
          required: "",
          custom: "",
        },
      },
    },
    /**
     * 导航更新
     */
    navigationUpdate: {
      paging: {
        title: "导航菜单",
      },
      target: {
        _blank: "新窗口",
        _self: "本窗口",
      },
      /**
       * 接链选择器
       */
      linkPicker: {
        placeholder: "查找或粘贴链接",
        records: "条记录",
        menu: {
          "3": [
            {
              label: "首页",
              id: 0,
              sub: false,
            },
            {
              label: "商品",
              id: 1,
              sub: true,
              all: {
                title: "全部商品",
                url: "/products#全部商品",
              },
            },
            {
              label: "商品集合",
              id: 2,
              sub: true,
              all: {
                title: "全部商品集合",
                url: "/products/collection#全部商品集合",
              },
            },
            {
              label: "文章",
              id: 3,
              sub: true,
              all: {
                title: "全部文章",
                url: "/articles#全部文章",
              },
            },
            {
              label: "文章集合",
              id: 4,
              sub: true,
              all: {
                title: "全部文章集合",
                url: "/articles/collection#全部文章集合",
              },
            },
            {
              label: "自定义页",
              id: 5,
              sub: true,
            },
            {
              label: "表单",
              id: 6,
              sub: true,
            },
            {
              label: "下载集合",
              id: 7,
              sub: true,
            },
            {
              label: "法律政策",
              id: 8,
              sub: true,
            },
            {
              label: "不跳转",
              id: 99,
              sub: false,
            },
          ],
          "2": [
            {
              label: "首页",
              id: 0,
              sub: false,
            },
            {
              label: "表单",
              id: 6,
              sub: true,
            },
            {
              label: "法律政策",
              id: 8,
              sub: true,
            },
            {
              label: "不跳转",
              id: 99,
              sub: false,
            },
          ],
          "4": [
            {
              label: "首页",
              id: 0,
              sub: false,
            },
            {
              label: "商品",
              id: 1,
              sub: true,
              all: {
                title: "全部商品",
                url: "/products#全部商品",
              },
            },
            {
              label: "商品集合",
              id: 2,
              sub: true,
              all: {
                title: "全部商品集合",
                url: "/products/collection#全部商品集合",
              },
            },
            {
              label: "文章",
              id: 3,
              sub: true,
              all: {
                title: "全部文章",
                url: "/articles#全部文章",
              },
            },
            {
              label: "文章集合",
              id: 4,
              sub: true,
              all: {
                title: "全部文章集合",
                url: "/articles/collection#全部文章集合",
              },
            },
            {
              label: "自定义页",
              id: 5,
              sub: true,
            },
            {
              label: "表单",
              id: 6,
              sub: true,
            },
            {
              label: "下载集合",
              id: 7,
              sub: true,
            },
            {
              label: "法律政策",
              id: 8,
              sub: true,
            },
            {
              label: "不跳转",
              id: 99,
              sub: false,
            },
          ],
        },
      },
    },
    /**
     * 错误提示
     */
    errorCode: {
      1507002: "请先删除子模块",
    },
  },
  menuList: [
    {
      title: "首页",
      abbr: "Dashboard",
      submenu: [],
      icon: "home",
      code: ["dashboard-startup"],
      url: "/dashboard",
      siteType: [2, 3, 4],
    },
    {
      title: "订单",
      abbr: "O",
      icon: "package",
      url: "/shop/:shopId:/orders",
      code: ["orders"],
      siteType: [2, 3, 4],
      submenu: [
        {
          title: "All",
          icon: "RectangleCopy33",
          code: ["orders-home"],
          url: "/shop/:shopId:/orders",
          siteType: [2, 3, 4],
        },
        {
          title: "Drafts",
          icon: "RectangleCopy92",
          code: ["orders-drafts"],
          url: "/shop/:shopId:/orders/drafts",
          siteType: [2, 3, 4],
        },
        {
          title: "Abandoned checkouts",
          icon: "RectangleCopy32",
          code: ["orders-checkouts"],
          url: "/shop/:shopId:/orders/checkouts",
          siteType: [2, 3, 4],
        },
      ],
    },
    {
      title: "产品",
      abbr: "P",
      icon: "app",
      url: "/products",
      code: ["organize"],
      siteType: [2, 3, 4],
      submenu: [
        {
          title: "Collections",
          icon: "RectangleCopy51",
          code: ["organize-birth"],
          url: "/shop/:shopId:/products/collections",
          siteType: [2, 3, 4],
        },
        {
          title: "Products",
          icon: "RectangleCopy77",
          code: ["organize-payroll"],
          url: "/shop/:shopId:/products",
          siteType: [2, 3, 4],
        },
      ],
    },
    {
      title: "客户",
      abbr: "C",
      submenu: [],
      icon: "customer",
      code: ["shop-customers"],
      url: "/shop/:shopId:/customers",
      siteType: [2, 3, 4],
    },
    {
      title: "询盘",
      abbr: "I",
      icon: "email",
      url: "/shop/:shopId:/inquiry",
      code: ["inquiry"],
      siteType: [2, 3, 4],
      submenu: [
        {
          title: "Record",
          icon: "",
          code: ["shop-inquiry-record"],
          url: "/shop/:shopId:/inquiry",
          siteType: [2, 3, 4],
        },
        {
          title: "Form",
          icon: "",
          code: ["shop-inquiry-form"],
          url: "/shop/:shopId:/inquiry/form",
          siteType: [2, 3, 4],
        },
        {
          title: "Recipient",
          icon: "",
          code: ["shop-inquiry-recipient"],
          url: "/shop/:shopId:/inquiry/recipient",
          siteType: [2, 3, 4],
        },
      ],
    },
    {
      title: "折扣",
      abbr: "C",
      submenu: [],
      icon: "currency-flow",
      code: ["shop-discounts"],
      url: "/shop/:shopId:/discounts",
      siteType: [2, 3, 4],
    },
    {
      title: "内容",
      abbr: "B",
      icon: "info",
      url: "/basic/nation",
      code: ["basic"],
      siteType: [2, 3, 4],
      submenu: [
        {
          title: "Menus",
          icon: "RectangleCopy153",
          code: ["shop-content-menus"],
          url: "/shop/:shopId:/content/menus",
          siteType: [2, 3, 4],
        },
        {
          title: "Blog posts",
          icon: "RectangleCopy159",
          code: ["shop-articles"],
          url: "/shop/:shopId:/content/articles",
          siteType: [2, 3, 4],
        },
        {
          title: "Pages",
          icon: "RectangleCopy62",
          code: ["shop-content-pages"],
          url: "/shop/:shopId:/content/pages",
          siteType: [2, 3, 4],
        },
        {
          title: "Files",
          icon: "RectangleCopy36",
          code: ["shop-content-files"],
          url: "/shop/:shopId:/content/files",
          siteType: [2, 3, 4],
        },
      ],
    },
  ],
  mainMenuList: [
    {
      title: "Dashboard",
      abbr: "Dashboard",
      submenu: [],
      icon: "RectangleCopy34",
      code: ["dashboard-startup"],
      url: "/dashboard",
      siteType: [2, 3, 4],
    },
    {
      title: "Live Studio",
      abbr: "L",
      icon: "",
      url: "/live/studio",
      code: ["account"],
      siteType: [2, 3, 4],
      submenu: [
        {
          title: "Merchant",
          icon: "RectangleCopy66",
          code: ["merchant-all"],
          url: "/account/merchant",
          siteType: [2, 3, 4],
        },
        {
          title: "Account",
          icon: "RectangleCopy8",
          code: ["account-input"],
          url: "/account",
          siteType: [2, 3, 4],
        },
        {
          title: "Daily Report",
          icon: "RectangleCopy43",
          code: ["account-daily"],
          url: "/account/daily",
          siteType: [2, 3, 4],
        },
        {
          title: "Monthly Report",
          icon: "RectangleCopy221",
          code: ["account-monthly"],
          url: "/account/monthly",
          siteType: [2, 3, 4],
        },
      ],
    },
    {
      title: "Base",
      abbr: "B",
      icon: "",
      url: "/basic/nation",
      code: ["basic"],
      siteType: [2, 3, 4],
      submenu: [
        {
          title: "Brand",
          icon: "RectangleCopy175",
          code: ["main-base-brand"],
          url: "/main/base/brand",
        },
        {
          title: "Config",
          icon: "RectangleCopy16",
          code: ["main-base-config"],
          url: "/main/base/config",
        },
        {
          title: "Region",
          icon: "RectangleCopy50",
          code: ["main-base-region"],
          url: "/main/base/region",
          siteType: [2, 3, 4],
        },
        {
          title: "Nation",
          icon: "RectangleCopy37",
          code: ["main-base-nation"],
          url: "/main/base/nation",
          siteType: [2, 3, 4],
        },
        {
          title: "Dictionary",
          icon: "RectangleCopy153",
          code: ["main-base-dict"],
          url: "/main/base/dict",
          siteType: [2, 3, 4],
        },
      ],
    },
    {
      title: "Organize",
      abbr: "O",
      icon: "",
      url: "/main/merchant/organize",
      code: ["organize"],
      siteType: [2, 3, 4],
      submenu: [
        {
          title: "Organize",
          icon: "RectangleCopy67",
          code: ["logistics-tracking"],
          url: "/main/merchant/organize",
          siteType: [2, 3, 4],
        },
        {
          title: "Function",
          icon: "RectangleCopy179",
          code: ["security-security-function"],
          url: "/main/security/function",
          siteType: [2, 3, 4],
        },
        {
          title: "Role",
          icon: "RectangleCopy214",
          code: ["security-security-role"],
          url: "/main/security/role",
          siteType: [2, 3, 4],
        },
      ],
    },
    {
      title: "Finance",
      abbr: "F",
      icon: "",
      url: "/finance/log",
      code: ["finance"],
      siteType: [2, 3, 4],
      submenu: [
        {
          title: "Logs",
          icon: "RectangleCopy242",
          code: ["finance-log"],
          url: "/finance/log",
          siteType: [2, 3, 4],
        },
        {
          title: "Installment",
          icon: "RectangleCopy242",
          code: ["finance-installment"],
          url: "/finance/installment",
          siteType: [2, 3, 4],
        },
      ],
    },
  ],
};
