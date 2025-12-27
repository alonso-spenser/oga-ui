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
    Password: /^[A-Za-z][A-Za-z0-9~!@#$%^&*]{5,19}$/,
    IdentityCard:
        /[\d]{6}(19|20)*[\d]{2}((0[1-9])|(11|12))([012][\d]|(30|31))[\d]{3}[xX\d]*/,
    EngAndNum: /[a-zA-Z0-9]*/,
    EngNumUnderline: /[a-zA-Z0-9_]*/,
    PhoneNumber: /(86)?(-)?(0\d{2,3})?(-)?(\d{7,8})(-)?(\d{1,5})?/,
    PostalCode: /\d{6}/,
    Account: /^[A-Za-z0-9@.]{8,19}$/,
    URL: /^[0-9a-zA-Z_]{1,}$/,
    Domain:
        /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/
  },
  /**
   * 获取使用的语言
   * @returns {string}
   */
  getLanguage(): string {
    let lang = localStorage.getItem("foUILanguage");
    if (!lang) {
      lang = navigator.language;
    }
    if (lang != null) {
      lang = "en|zh-CN".indexOf(lang) > -1 ? lang : "en";
    }
    localStorage.setItem("foUILanguage", lang);
    return lang;
  },
  /**
   * 是否为空
   * @param value
   * @returns {boolean}
   */
  isEmpty(value: string | null | undefined) {
    return !(value === undefined || value === null
        ? false
        : /[\S]/.test(value));
  },
  /**
   * 不为空
   * @param value
   * @returns {boolean}
   */
  isNotEmpty(value: string | null | undefined) {
    return !this.isEmpty(value);
  },
}