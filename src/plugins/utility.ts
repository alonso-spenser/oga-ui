Element.prototype.data = function (key, value) {
  let that = this
  let dataName = 'testData'
  let data = {}
  if (typeof key === 'undefined' && typeof value === 'undefined') {
    return that[dataName]
  }
  if (typeof (value) !== 'undefined') {
    let _type = typeof (value)
    if (_type === 'string' || _type === 'number') {
      that.setAttribute(key, value)
    }
    data = that[dataName] || {}
    data[key] = value
    that[dataName] = data
    return this
  } else {
    data = that[dataName] || {}
    return data[key] || that.getAttribute(key)
  }
}

export default {
  expression: {
    Required: /[\S]/,
    Email: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
    Int: /(-)?(\d+)$/,
    IntPositive: /^\+?[0-9]\d*$/,
    /// ^[0-9]*[1-9][0-9]$/,
    IntZeroPositive: /^\+?[1-9]\d*$/,
    Float: /(-)?(\d+)(((\.)(\d)+))?/,
    FloatPositive: /^([0-9]\d*(.\d+)*|0\.(?=\d*[1-9]\d*)\d+)$/,
    FloatZeroPositive: /^([1-9]\d*(.\d+)*|0\.(?=\d*[1-9]\d*)\d+)$/,
    Chinese: /[\u4e00-\u9fa5]/,
    English: /[a-zA-Z]/,
    Mobile: /^[1]([3-9])[0-9]{9}$/,
    Password: /^[A-Za-z][A-Za-z0-9~!@#\$%^&\*]{5,19}$/,
    IdentityCard: /[\d]{6}(19|20)*[\d]{2}((0[1-9])|(11|12))([012][\d]|(30|31))[\d]{3}[xX\d]*/,
    EngAndNum: /[a-zA-Z0-9]*/,
    EngNumUnderline: /[a-zA-Z0-9_]*/,
    PhoneNumber: /(86)?(-)?(0\d{2,3})?(-)?(\d{7,8})(-)?(\d{1,5})?/,
    PostalCode: /\d{6}/,
    Account: /^[A-Za-z0-9@\.]{8,19}$/,
    URL: /^[0-9a-zA-Z_]{1,}$/,
    Domain: /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/,
    checkLength: (rule, value, callback) => {
      if (value) {
        if (value.length <= rule.length && value.length >= 0) {
          callback()
        } else {
          callback(new Error(i18n.t('validatorRole.checkLength') + rule.length))
        }
      } else {
        callback()
      }
    }
  },
  dateFormat (dt, format) {
    let o = {
      'M+': dt.getMonth() + 1,
      'd+': dt.getDate(),
      'h+': dt.getHours(),
      'm+': dt.getMinutes(),
      's+': dt.getSeconds(),
      'q+': Math.floor((dt.getMonth() + 3) / 3),
      'S': dt.getMilliseconds()
    }
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (dt.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
      }
    }
    return format
  },
  /**
   * 添加天数
   * @param days 天
   * @param date 当前时间
   */
  addDay (days, date) {
    date = date || new Date()
    const ms = days * (1000 * 60 * 60 * 24)
    const newDate = new Date(date.getTime() + ms)
    return newDate.getTime()
  },
  /**
   * 添加月
   * @param month 月
   * @param date 当前时间
   */
  addMonth (month, date) {
    date = date || new Date()
    date.setMonth(date.getMonth() + month)
    return date.getTime()
  },
  /**
   * 添加年
   * @param year 天
   * @param date 当前时间
   */
  addYear (year, date) {
    date = date || new Date()
    date.setFullYear(date.getFullYear() + year)
    return date.getTime()
  },
  timestampToDate (span, format) {
    let date = new Date(span)
    return this.dateFormat(date, format || 'yyyy-MM-dd')
  },
  timestampToDatetime (span, format) {
    let date = new Date(span)
    return this.dateFormat(date, format || 'yyyy-MM-dd hh:mm:ss')
  },
  getPos (e) {
    let dd = document.documentElement
    let db = document.body
    let bc = e.getBoundingClientRect()
    return {
      left: bc.left + Math.max(dd.scrollLeft, db.scrollLeft),
      top: bc.top + Math.max(dd.scrollTop, db.scrollTop),
      height: e.offsetHeight,
      width: e.offsetWidth
    }
  },
  siteStatusColor (status) {
    return status === 0 ? 'el-button--danger' : status === 1 ? 'el-button--success' : 'el-button--info'
  },
  /**
   * 提取HTML 纯文本
   * @param html
   * @param length
   * @returns {string}
   */
  extractText (html, length) {
    html = html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').replace(/↵/g, '').replace(/[\r\n]/g, '').replace(/&nbsp;/ig, '')
    if (length && length > 0) {
      html = html.substring(0, length)
    }
    return html.trim()
  },
  /**
   * 删除空格
   * @param value
   * @returns {*}
   */
  removeAllSpace (value) {
    return this.isEmpty(value) ? '' : value.replace(/\s+/g, '')
  },
  /**
   * 删除换行符
   * @param value
   * @returns {string|*}
   */
  clearLineSymbol (value) {
    return this.isEmpty(value) ? '' : value.replace(/[\r\n]/g, '')
  },
  /**
   * 删除换行符
   * @param value
   * @returns {string|*}
   */
  clearLineSymbolAndCapitalize (value) {
    return this.charAtToUpperCase(this.isEmpty(value) ? '' : value.replace(/[\r\n]/g, ''))
  },
  /**
   * 清理HTML内容
   * @param html 内容
   * @param tagName 元素
   * @param attrName 节点 多个以|相连：width|height
   */
  filterHTML (html, tagName, attrName) {
    const reg = RegExp('(' + attrName + ')\\s*=\\s*[\'"][^\'"]+[\'"]', 'gi')
    return html.replace(RegExp('<' + tagName + '\\s+[^>]+>', 'gi'), (tag) => {
      return tag.replace(reg, '')
    })
  },
  /**
   * 添加CLASS
   * @param html
   * @param callback
   * @returns {*}
   */
  addClass (html, callback) {
    return html.replace(/<(\w+)([^>]+)?>/g, (_, tag, other) => {
      other = other || ''
      const moreClass = callback(tag, other)
      if (this.isEmpty(moreClass)) {
        return '<' + tag + other + '>'
      }
      if (/\bclass\s*=\s*/.test(other)) {
        other = other.replace(/\bclass\s*=\s*(['"'])(.+)\1/, 'class=$1$2 ' + moreClass + '$1')
      } else {
        other = other + ' class="' + moreClass + '"'
      }
      return '<' + tag + other + '>'
    })
  },
  /**
   * URL过滤，只保留英文、数字、中划线
   * @param url
   * @returns {string}
   */
  urlFilter (url) {
    return url.replace(/[^a-zA-Z\d]/g, ' ').trim().replace(/\s+/g, '-').toLowerCase().replace(/[\r\n]/g, '')
  },
  /**
   * location origin
   * @returns {string}
   */
  locationOrigin () {
    if (!window.location.origin) {
      return window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
    }
    return location.origin
  },
  /**
   * 首字大写
   * @param value
   * @returns {string}
   */
  capitalize (value) {
    return value.toLowerCase().replace(/( |^)[a-z]/g, (l) => l.toUpperCase())
  },
  /**
   * 首字小写
   * @param value
   * @returns {string}
   */
  firstLowerCase (value) {
    return value.replace(/( |^)[a-z]/g, (l) => l.toLowerCase())
  },
  /**
   * 是否为空
   * @param value
   * @returns {boolean}
   */
  isEmpty (value) {
    return !((value === undefined || value === null) ? false : /[\S]/.test(value))
  },
  /**
   * 不为空
   * @param value
   * @returns {boolean}
   */
  isNotEmpty (value) {
    return !this.isEmpty(value)
  },
  /**
   * 批量操作（表头悬浮菜单）
   */
  bulkActions (el) {
    let pos = this.getPos(el)
    let scrollTop = document.documentElement.scrollTop
    let o = document.querySelector('.bulk-actions')
    let col = el.querySelector('colgroup').querySelectorAll('col')
    let left = parseInt(col[0].getAttribute('width'))
    o.style.width = (pos.width - left + 5) + 'px'
    o.style.left = (pos.left + left) + 'px'
    o.style.top = (pos.top - scrollTop) + 'px'
    o.style.height = (pos.height - 1) + 'px'
  },
  /**
   * 获取使用的语言
   * @returns {string}
   */
  getLanguage () {
    let lang = localStorage.getItem('foUILanguage')
    if (!lang) {
      lang = (navigator.language || navigator.userLanguage)
    }
    lang = 'en|zh-CN'.indexOf(lang) > -1 ? lang : 'en'
    localStorage.setItem('foUILanguage', lang)
    return lang
  },
  /**
   * element animated
   * @param selector
   * @param animationName
   * @param callback
   */
  animateCSS (selector, animationName, callback) {
    const node = document.querySelector(selector)
    node.classList.add('animated', 'ultra-fast', animationName)

    function handleAnimationEnd () {
      node.classList.remove('animated', 'ultra-fast', animationName)
      node.removeEventListener('animationend', handleAnimationEnd)
      if (callback && typeof callback === 'function') {
        callback.call(this)
      }
    }

    node.addEventListener('animationend', handleAnimationEnd)
  },
  /**
   * element animated
   * @param selector
   * @param animationName
   * @param callback
   */
  animateSlide (selector, animationName, callback) {
    const node = document.querySelector(selector)
    node.classList.add('animated', 'ultra-fast', animationName)

    function handleAnimationEnd () {
      node.classList.remove('animated', 'ultra-fast', animationName)
      node.removeEventListener('animationend', handleAnimationEnd)

      if (callback && typeof callback === 'function') {
        callback()
      }
    }

    node.addEventListener('animationend', handleAnimationEnd)
  },
  /**
   * 涵数防抖
   * @param fn
   * @param delay
   * @returns {Function}
   */
  debounce (fn, delay) {
    let timer
    return function (...args) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  },
  /**
   * 打开新标签页
   * @param url
   */
  openSite (url) {
    let o = window.open('', '_blank', '')
    o.location.href = url
  },
  /**
   * 获取LIST数据
   * @param dict
   * @param value
   * @param label
   */
  getDicType (dict, value, label = 'label') {
    const res = dict.find(i => i.value === parseInt(value))
    return res ? res[label] : ''
  },
  /**
   * 获取HTML属性值
   * @param html
   * @param key
   */
  getHtmlAttribute (html, key) {
    let pattern = new RegExp('.+? ' + key + '="([^"]+)".+', 'gi')
    return html.replace(pattern, '$1')
  },
  /**
   * 移动端判断
   * @returns {boolean}
   */
  mobile () {
    let agent = navigator.userAgent || navigator.vendor || window.opera
    return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(agent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(agent.substr(0, 4))
  },
  /**
   * 微信浏览器
   * @param agent
   */
  microMessenger (agent) {
    agent = agent || navigator.userAgent || navigator.vendor || window.opera
    let m = agent.match(/MicroMessenger/i)
    return m && m.join('') === 'micromessenger'
  },
  /**
   * 主流浏览器（PC）
   * @returns {boolean}
   */
  majorBrowser () {
    let userAgent = navigator.userAgent
    this.userAgent = userAgent
    return userAgent.indexOf('Opera') > -1 || userAgent.indexOf('Firefox') > -1 || userAgent.indexOf('Safari') > -1 || userAgent.indexOf('Chrome') > -1
  },
  /**
   * URL参数替换
   * @param url
   * @param key
   * @returns {*}
   */
  urlParameterClear (url, key) {
    url = url.replace(new RegExp(key + '=[^&]*', 'gi'), '').replace(/&&/g, '&').replace(/\?&/, '?')
    return !url.match(/\?/g) ? url + '?' : !url.match(/(&|\?)$/) ? url + '&' : url
  },
  /**
   * 帐户合法性验证
   * @param account
   */
  accountValidity (account) {
    if (this.isEmpty(account)) {
      return false
    } else {
      return this.expression.Account.test(account) || this.expression.Email.test(account)
    }
  },
  subString (value, length) {
    if (this.isEmpty(value) || value.length < length) {
      return value || ''
    }
    return value.substring(0, length)
  },
  /**
   * 文件类型
   */
  fileType (file) {
    const index = file.lastIndexOf('.')
    const postfix = (index !== -1 ? file.substring(index + 1, file.length).toLowerCase() : 'file').toLowerCase()
    let result = 0
    if ('bmp,jpg,jpeg,png,tif,gif,pcx,tga,exif,fpx,svg,psd,cdr,pcd,dxf,ufo,eps,ai,raw,wmf,webp'.indexOf(postfix) !== -1) {
      result = 0
    } else if (postfix === 'pdf') {
      result = 3
    } else if (postfix === 'doc,docx') {
      result = 3
    }
    // 文件类型，1图片，2视频，3文稿，4压缩包
    return result
  },
  suffix (fileName) {
    return fileName.indexOf('.') === -1 ? fileName : fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase()
  },
  fileName (fileName) {
    return fileName.indexOf('.') === -1 ? fileName : fileName.substring(0, fileName.lastIndexOf('.'))
  },
  /**
   * 合并JSON
   * @param o
   * @param n
   */
  mergeJSON (o, n) {
    let oType = Object.prototype.toString.call(o)
    let nType = Object.prototype.toString.call(n)
    if (nType === '[object Object]' && oType === '[object Object]') {
      for (let p in n) {
        if (n.hasOwnProperty(p) && !o.hasOwnProperty(p)) {
          o[p] = n[p]
        } else if (n.hasOwnProperty(p) && (o.hasOwnProperty(p))) {
          let oPType = Object.prototype.toString.call(o[p])
          let nPType = Object.prototype.toString.call(n[p])
          if ((nPType === '[object Object]' && oPType === '[object Object]') || (nPType === '[object Array]' && oPType === '[object Array]')) {
            this.mergeJSON(o[p], n[p])
          } else {
            o[p] = n[p]
          }
        }
      }
    } else if (nType === '[object Array]' && oType === '[object Array]') {
      for (let i in n) {
        let oIType = Object.prototype.toString.call(o[i])
        let nIType = Object.prototype.toString.call(n[i])
        if ((nIType === '[object Object]' && oIType === '[object Object]') || (nIType === '[object Array]' && oIType === '[object Array]')) {
          this.mergeJSON(o[i], n[i])
        } else {
          o[i] = n[i]
        }
      }
    }
    o = n
  },
  /**
   * 验证码
   */
  captcha () {
    let key = new Date().getTime()
    return {
      key: key,
      url: this.apiURL() + '/common/api/captcha/get/' + key,
      sent: false
    }
  },
  /**
   * API URL
   * @returns {*}
   */
  apiURL () {
    return process.env.VUE_APP_API
  },
  /**
   * API URL
   * @returns {*}
   */
  uploadURL () {
    return process.env.VUE_APP_UPLOAD
  },
  /**
   * 清理CSS变量
   * @param css
   */
  clearCSSVariable (css) {
    if (this.isEmpty(css)) {
      return ''
    }
    // eslint-disable-next-line no-template-curly-in-string
    return css.trim().replace(/calc\(var\(--(.+?)\)\s\*\s1px\)/g, '[[${globalDesignMode ? \'-CalcPrefix-$1-CalcSuffix-\' : $1 + \'px\'}]]')
      // eslint-disable-next-line no-template-curly-in-string
      .replace(/var\(--(.+?)\)/g, '[[${globalDesignMode ? \'var(--$1)\' : $1}]]')
      .replace(/-CalcPrefix-/g, 'calc(var(--')
      .replace(/-CalcSuffix-/g, ') * 1px)')
  },
  getMonthStartAndEndByTimespan (timespan, format) {
    let now = new Date(timespan)
    format = format || 'yyyy-MM-dd hh:mm:ss'
    let month = now.getMonth()
    let year = now.getFullYear()
    let first = new Date(year, month, 1)
    let last = new Date(year, month + 1, 0, 23, 59, 59)
    return {
      first: {
        value: first,
        timespan: first.getTime(),
        format: this.dateFormat(first, format)
      },
      last: {
        value: last,
        timespan: last.getTime(),
        format: this.dateFormat(last, format)
      }
    }
  },
  /**
   * 单个首字大写
   * @param value
   */
  charAtToUpperCase (value) {
    if (this.isEmpty(value)) {
      return ''
    }
    value = value.trim()
    return value.replace(value.charAt(0), value.charAt(0).toUpperCase())
  },
  /**
   * day 想要获取之前的天数
   * 获取当前时间几天之前时间戳
   */
  getBeforeDayTimeString (day) {
    let now = new Date(new Date(new Date().toLocaleDateString()).getTime())
    now.setDate(now.getDate() - day)
    return now.getTime()
  },
  /**
   * 删除不要的属性
   */
  deleteObjType (data, typeName) {
    data.forEach((item, index) => {
      if (typeof item === 'object') {
        if (item.hasOwnProperty(typeName)) {
          delete item[typeName]
        }
      } else {
        if (item === typeName) {
          data.splice(index, 1)
        }
      }
    })
  },
  getImage (url, placeholder) {
    return this.isEmpty(url) ? placeholder : url
  }
}
