/**
 * Dict State
 */
export interface DictState {
  label: string;
  value: string | number | boolean;
}

/**
 * Regular expression rules
 */
export const regExpRules = {
  /**
   * Not empty (cannot be entirely spaced)
   */
  Required: /\S+/,
  /**
   * Email
   */
  Email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  /**
   * Integers (including negative numbers)
   */
  Int: /^-?\d+$/,
  /**
   * Positive integers (including 0)
   */
  IntPositive: /^\d+$/,
  /**
   * Positive integers (not including 0)
   */
  IntZeroPositive: /^[1-9]\d*$/,
  /**
   * Floating-point numbers (including negative numbers)
   */
  Float: /^-?\d+(\.\d+)?$/,
  /**
   * Positive floating-point numbers (including 0)
   */
  FloatPositive: /^(?:\d+(\.\d+)?|\.\d+)$/,
  /**
   * Positive floating-point numbers (not including 0)
   */
  FloatZeroPositive: /^(?:[1-9]\d*(\.\d+)?|0?\.\d*[1-9]\d*)$/,
  /**
   * Chinese characters (at least one)
   */
  Chinese: /^[\u4e00-\u9fa5]+$/,
  /**
   * English characters (at least one)
   */
  English: /^[A-Za-z]+$/,
  /**
   * Mobile phone number
   */
  Mobile: /^1[3-9]\d{9}$/,
  /**
   * Password (8-19 digits, letters, and special characters)
   */
  Password: /^[A-Za-z][A-Za-z0-9~!@#$%^&*]{5,19}$/,
  /**
   * Chinese ID card number
   */
  IdentityCard:
      /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[0-9Xx]$/,
  /**
   * English and numbers
   */
  EngAndNum: /^[A-Za-z0-9]+$/,
  /**
   * English and numbers and underscores
   */
  EngNumUnderline: /^\w+$/,
  /**
   * Chinese Phone number
   */
  PhoneNumber: /^(?:\+?86-?)?(0\d{2,3}-?)?\d{7,8}(?:-\d{1,5})?$/,
  /**
   * Chinese postal code
   */
  PostalCode: /^\d{6}$/,
  /**
   * Account (8-19 digits, letters, and dots)
   */
  Account: /^[A-Za-z0-9@.]{8,19}$/,
  /**
   * URL
   */
  SimpleURL: /^[A-Za-z0-9_]+$/,
  /**
   * Domain name
   */
  Domain: /^(?=.{3,255}$)([A-Za-z0-9][-A-Za-z0-9]{0,62}\.)+[A-Za-z]{2,}$/,
};

/**
 * native function?
 * @param fn Function | Type Function
 */

export const isNative = (fn: any) => {
  return (
      typeof fn === "function" && /\{\s*\[native code]\s*}/.test(fn.toString())
  );
};

/**
 * is Function
 * @param fn Function | Type Function
 */

export const isFunction = (fn: Function) => {
  return !isNative(fn)
};

/**
 * Check whether a value is empty.
 * Empty means: null, undefined, or only whitespace.
 */
export const isEmpty = (value: string | null | undefined): boolean => {
  return value == null || value.trim().length === 0;
};

/**
 * Check whether a value is not empty.
 */
export const isNotEmpty = (value: string | null | undefined): boolean => {
  return !isEmpty(value);
};

/**
 * Date format
 * @param date Date
 * @param format Format
 */
export const formatDate = (
    date: Date,
    format = "yyyy-MM-dd hh:mm:ss",
): string => {
  const map: Record<string, number> = {
    y: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    S: date.getMilliseconds(),
  };

  return format.replace(/y+|M+|d+|h+|m+|s+|S/g, (token) => {
    const key = token[0];
    // @ts-expect-error map is indexed by the regex token above.
    const value = String(map[key]);
    return token.length === 1 ? value : value.padStart(token.length, "0");
  });
};

/**
 * Add days without mutating the original date
 * @param days Days
 * @param date Date
 */
export const addDays = (days: number, date = new Date()): number => {
  return new Date(date.getTime() + days * 86400000).getTime();
};

/**
 * Add months without mutating the original date
 * @param months Months
 * @param date Date
 */
export const addMonths = (months: number, date = new Date()): number => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d.getTime();
};

/**
 * Add years without mutating the original date
 * @param years Years
 * @param date Date
 */
export const addYears = (years: number, date = new Date()): number => {
  const d = new Date(date);
  d.setFullYear(d.getFullYear() + years);
  return d.getTime();
};

/**
 * Timestamp to date
 * @param ts Timestamp
 * @param format Format
 */
export const timestampToDate = (ts: number, format?: string) =>
    formatDate(new Date(ts), format || "yyyy-MM-dd");

/**
 * Timestamp to datetime
 * @param ts Timestamp
 * @param format Format
 */
export const timestampToDatetime = (ts: number, format?: string) =>
    formatDate(new Date(ts), format || "yyyy-MM-dd hh:mm:ss");

/**
 * Format minutes as hours and remaining minutes.
 * @example formatMinutes(10179) => "169h 39m"
 */
export const formatMinutes = (minutes: number): string => {
  if (!Number.isFinite(minutes) || minutes < 0) return "0h 0m";

  const totalMinutes = Math.floor(minutes);
  const hours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  return `${hours}h ${remainingMinutes}m`;
};

/**
 * Get full years from timestamp to now
 * @param ts Timestamp
 */
export const getYearsFromTimestamp = (ts: number): number => {
  const date = new Date(ts);
  const now = new Date();
  let years = now.getFullYear() - date.getFullYear();

  const hasNotReachedAnniversary =
      now.getMonth() < date.getMonth() ||
      (now.getMonth() === date.getMonth() && now.getDate() < date.getDate());

  if (hasNotReachedAnniversary) {
    years -= 1;
  }

  return Math.max(0, years);
};

/**
 * Get element position
 * @param el HTMLElement
 */
export const getElementPosition = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  const scrollLeft = window.pageXOffset;
  const scrollTop = window.pageYOffset;

  return {
    left: rect.left + scrollLeft,
    top: rect.top + scrollTop,
    width: rect.width,
    height: rect.height,
  };
};

/**
 * Extract HTML plain text
 * @param html HTML
 * @param length Length
 */
export const extractText = (html: string, length?: number): string => {
  const text = html
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .replace(/[\r\n↵]/g, "")
      .replace(/&nbsp;/gi, "")
      .trim();

  return length ? text.slice(0, length) : text;
};

/**
 * Remove spaces
 * @param value
 */
export const removeSpace = (value?: string | null): string =>
    value ? value.replace(/\s+/g, "") : "";

/**
 * Delete newline character
 * @param value
 */
export const clearLineBreak = (value?: string | null): string =>
    value ? value.replace(/[\r\n]/g, "") : "";

/**
 * Delete the newline character and capitalize the first letter
 * @param value
 */
export const clearLineBreakAndCapitalize = (value?: string | null): string =>
    firstCapitalize(clearLineBreak(value));

/**
 * Capitalize the first letter
 * @param value
 */
export const firstCapitalize = (value: string): string =>
    value.replace(/\b[a-z]/g, (c) => c.toUpperCase());

/**
 * Convert the first letter to the lowercase
 * @param value
 */
export const firstLowerCase = (value: string): string =>
    value.replace(/\b[A-Z]/g, (c) => c.toLowerCase());

/**
 * Get location origin
 */
export const getLocationOrigin = (): string =>
    window.location.origin ||
    `${window.location.protocol}//${window.location.host}`;

/**
 * URL filter
 * @param url
 */
export const urlFilter = (url: string): string =>
    url
        .replace(/[^a-zA-Z0-9]/g, " ")
        .trim()
        .replace(/\s+/g, "-")
        .toLowerCase();

/**
 * Get the current UI language.
 * Fallback order:
 * 1. localStorage
 * 2. browser language
 * 3. default language
 */
export const getLanguage = (): string => {
  const STORAGE_KEY = "ogaLocale";
  const DEFAULT_LANG = "en";
  const SUPPORTED_LANGs = ["en", "zh-CN"];

  const storedLang = localStorage.getItem(STORAGE_KEY);
  const browserLang = navigator.language;

  const lang = storedLang || browserLang || DEFAULT_LANG;

  const finalLang = SUPPORTED_LANGs.includes(lang as any) ? lang : DEFAULT_LANG;

  localStorage.setItem(STORAGE_KEY, finalLang);

  return finalLang;
};

/**
 * Get the current UI language.
 * Fallback order:
 * 1. localStorage
 * 2. browser language
 * 3. default language
 */
export const setLanguage = (lang: string): void => {
  const STORAGE_KEY = "ogaLocale";
  const DEFAULT_LANG = "en";
  const SUPPORTED_LANGS = ["en", "zh-CN"] as const;
  if ((SUPPORTED_LANGS as readonly string[]).includes(lang)) {
    localStorage.setItem(STORAGE_KEY, lang);
  } else {
    localStorage.setItem(STORAGE_KEY, DEFAULT_LANG);
  }
};

/**
 * Array is empty
 * @param arr
 */
export const arrayNotEmpty = (arr: any[]) => {
  return !arr || (Array.isArray(arr) && arr.length === 0);
};

/**
 * Clear html tag
 * @param html HTML
 * @param tagName Tag name
 * @param attrName Attributes：width|height
 */
export const filterHTML = (html: string, tagName: string, attrName: string) => {
  const reg = RegExp("(" + attrName + ")\\s*=\\s*['\"][^'\"]+['\"]", "gi");
  return html.replace(RegExp("<" + tagName + "\\s+[^>]+>", "gi"), (tag) => {
    return tag.replace(reg, "");
  });
};

/**
 * Check whether a value is a positive integer (greater than 0).
 */
export const isPositiveInteger = (value: unknown): boolean => {
  if (typeof value === "number") {
    return Number.isInteger(value) && value > 0;
  }

  if (typeof value === "string") {
    return /^[1-9]\d*$/.test(value);
  }

  return false;
};

/**
 * Upload URL
 */
export const getUploadUrl = (): string => {
  return import.meta.env.VITE_APP_UPLOAD;
};

/**
 * Get label from dict by value
 * @param list
 * @param value
 * @param label
 */
export const getDictValue = (
    list: DictState[],
    value: string | number | boolean,
    label: keyof DictState = "label",
) => {
  return list.find((i) => i.value === value)?.[label] ?? "";
};

/**
 * Format number
 * @param num
 */
export const formatNumber = (num: number) => {
  const units = ["", "K", "M", "B", "T"];
  let i = 0;

  while (num >= 1000 && i < units.length - 1) {
    num /= 1000;
    i++;
  }
  return num.toFixed(1).replace(/\.0$/, "") + units[i];
};

/**
 * Format number
 * @param num
 */
export const formatNumberLocation = (num: number) => {
  try {
    return num.toLocaleString("en-US");
  } catch {
    return num;
  }
};

/**
 * Pad number with zero when less than 10
 * @param num
 */
export const padZero = (num: number): string => {
  return num < 10 ? `0${num}` : String(num);
};

/**
 * Mask string
 * @param str
 */
export const maskString = (str: string) => {
  return str.replace(/^(.)(.*)(.)$/, (match, start, middle, end) => {
    return start + "*".repeat(middle.length > 5 ? 5 : middle.length) + end;
  });
};

/**
 * Mask one third string
 * @param str
 */
export const maskOneThirdString = (str: string) => {
  if (!str || str.length < 3) return str;

  const len = str.length;
  const maskLen = Math.max(1, Math.floor(len / 3));
  const start = Math.floor((len - maskLen) / 2);

  return str.slice(0, start) + "*".repeat(maskLen) + str.slice(start + maskLen);
};

/**
 * Mask email
 * @param email
 */
export const maskEmail = (email: string): string => {
  if (!email) return "";

  const [name, domain] = email.split("@");
  if (!name) return email;

  return maskString(name) + "@" + domain;
};

/**
 * Replace hyphens with spaces
 * "user-name-test" -> "user name test"
 */
export const replaceHyphenWithSpace = (str: string): string =>
    str.replace(/-/g, " ");

/**
 * String to camel case
 * "user-name-test" → userNameTest
 */
export const toCamelCase = (str: string): string =>
    str
        .replace(/[^a-zA-Z0-9]+/g, " ")
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .map((word, i) =>
            i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
        )
        .join("");

/**
 * To pascal case
 * "user-name" → UserName
 */
export const toPascalCase = (str: string): string =>
    str
        .replace(/[^a-zA-Z0-9]+/g, " ")
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");

/**
 * To snake case
 * "username test" → user_name_test
 */
export const toSnakeCase = (str: string): string =>
    str
        .replace(/[^a-zA-Z0-9]+/g, " ")
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .join("_");

/**
 * To kebab case
 * "user name test" → user-name-test
 */
export const toKebabCase = (str: string): string =>
    str
        .replace(/[^a-zA-Z0-9]+/g, " ")
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .join("-");

/**
 * Keep alphanumeric
 * "abc@123!!" → abc123
 */
export const keepAlphaNumeric = (str: string): string =>
    str.replace(/[^a-zA-Z0-9]/g, "");

/**
 * Remove HTML
 * @param str
 */
export const removeHtml = (str: string): string => str.replace(/<[^>]*>/g, "");

/**
 * "d 11 /@#$%^&*())_(*@213 hello ^) world!" → d-11-213-hello-world
 */
export const slugifyURL = (str: string): string =>
    str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

/**
 * Generic setter (optimized)
 */
export const setName = <T, K extends keyof T, V extends keyof T>(
    value: T[K] | null | undefined,
    list: T[],
    matchKey: K,
    valueKey: V,
    defaultValue: T[V],
): T[V] => {
  if (value == null) return defaultValue;

  const target = list.find((item) => item[matchKey] === value);
  return target?.[valueKey] ?? defaultValue;
};

/**
 * Abbreviation
 */
export const ABBREVIATIONS = ["VPN", "API", "IP", "MCN", "PayPal", "PalmPay"];

/**
 * format label
 * eg: PayIn => Pay In
 * @param key
 */
export const formatLabel = (key: string): string => {
  if (ABBREVIATIONS.includes(key)) return key;

  return key
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
      .trim();
};

/**
 * Create Options
 * enum => DictState[]
 */
export const createOptions = <T extends Record<string, string | number>>(
    e: T,
    t?: (key: string) => string,
    prefix?: string,
): DictState[] => {
  return Object.keys(e)
      .filter((key) => isNaN(Number(key)))
      .map((key) => ({
        get label() {
          return prefix && t ? t(`${prefix}.${key}`) : formatLabel(key);
        },
        value: e[key as keyof T],
      }));
};

/**
 * Get WhatsApp link
 * @param phone
 * @param areaCode
 * @param removeFirstChar
 */
export const getWhatsAppLink = (
    phone: string,
    areaCode?: string,
    removeFirstChar = false,
): string => {
  if (isEmpty(phone)) {
    return "";
  }

  return `https://wa.me/${areaCode ?? ""}${removeFirstChar ? phone.slice(1) : phone}`;
};


/**
 * File type map
 * 1 = image
 * 2 = video
 * 3 = document
 * 4 = archive
 */
const FILE_TYPE_MAP: Record<number, Set<string>> = {
  1: new Set([
    'bmp','jpg','jpeg','png','tif','gif','pcx','tga','exif','fpx',
    'svg','psd','cdr','pcd','dxf','ufo','eps','ai','raw','wmf','webp','sketch'
  ]),
  2: new Set(['vob','mpg','avi','mp4','mkv','mov']),
  3: new Set(['pdf','doc','docx']),
  4: new Set(['zip','7z','rar'])
}

/**
 * Detect file type
 * @param fileName string
 * @returns number
 */
export const getFileType = (fileName: string): number => {
  const suffix = getSuffix(fileName)

  for (const [type, suffixSet] of Object.entries(FILE_TYPE_MAP)) {
    if (suffixSet.has(suffix)) {
      return Number(type)
    }
  }

  return 0
};

/**
 * Get file extension
 * @param fileName string
 * @returns string
 */
export const getSuffix = (fileName: string): string => {
  const index = fileName.lastIndexOf('.')
  return index === -1 ? '' : fileName.substring(index + 1).toLowerCase()
}