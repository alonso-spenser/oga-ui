export default {
  fo: {
    title: 'fomille'
  },
  pageAborted: {
    loading: 'loading',
    heading: 'Sorry, there is an error with the page you are visiting',
    subheading: 'the reasons could be：',
    c1: 'The site is undergoing maintenance',
    c2: 'The website has a programming error',
    attempt: 'You can try the following operations：',
    a1: 'Go back to the previous level',
    a2: 'Go to this page again',
    a3: 'Try again later'
  },
  operate: {
    label: 'Operate'
  },
  fileUpload: {
    label: '附件',
    remove: '移除',
    placeholder: 'Choose file',
    maxSize: '附件最大 {size} MB',
    limit: '附件最大不能超过',
    drag: 'Drag file here, or',
    fileName: '附件名称',
    pass: '密码',
    setPass: '设置下载密码 >',
    confirm: '确定',
    cancel: '取消',
    image: '图片上传',
    delete: {
      heading: '删除此图像？',
      subheading: '是否确实要删除此图像？此操作无法撤消。'
    },
    deleteFile: {
      heading: '删除此文件？',
      subheading: '是否确实要删除此文件？此操作无法撤消。'
    },
    alt: {
      label: 'ALT',
      heading: '编辑图片 Alt 信息',
      subheading: '为图片添加简短的描述，提高被搜索引擎收录机会'
    },
    entity: {
      coverImage: {
        label: '封面图片',
        tips: '',
        placeholder: '封面图片',
        required: '请输入封面图片',
        custom: ''
      },
      title: {
        label: '文件名称',
        tips: '',
        placeholder: '文件名称',
        required: '请输入文件名称',
        custom: ''
      },
      url: {
        label: '文件地址',
        tips: '',
        placeholder: '文件地址',
        required: '请输入文件地址',
        custom: ''
      },
      description: {
        label: '简要介绍',
        tips: '',
        placeholder: '简要介绍',
        required: '请输入简要介绍',
        custom: ''
      }
    }
  },
  unsaved: {
    tips: 'UNSAVED CHANGES',
    save: 'SAVE',
    cancel: 'CANCEL'
  },
  /**
   * 图片ALT编辑弹窗
   */
  imageAlt: {
    heading: '编辑图片 Alt 信息',
    subheading: '为图片添加简短的描述，提高被搜索引擎收录机会',
    limit: '图片大小不能超过',
    confirm: '确定',
    cancel: '取消',
    entity: {
      alt: {
        label: 'ALT',
        placeholder: 'Please enter an ALT text',
        required: ''
      }
    }
  },
  tinymce: {
    clearWidth: {
      title: '清除图片宽度',
      content: '清除图片宽度后，图片尺寸会按高度（若有）进行比例显示，最大尺寸为外部容器宽度'
    },
    clearHeight: {
      title: '清除图片高度',
      content: '清除图片高度后，图片尺寸会按宽度（若有）进行比例显示，最大尺寸为外部容器宽度'
    },
    clearBoth: {
      title: '清除图片宽高',
      content: '清除图片宽度和高度尺寸后，图片会以正常尺寸和比例显示，最大尺寸为外部容器宽度'
    },
    tableWidth: {
      title: '表格宽度',
      content: '表格默认宽度强制为 100%，固定表格宽度由需加样式：<b class="text-primary">fixed-width</b> 例：&lt;table class=&quot;fixed-width&quot;&gt;&lt;/table&gt;',
      fixedWidth: '默认宽度',
      fullWidth: '100%宽度'
    }
  }
}
