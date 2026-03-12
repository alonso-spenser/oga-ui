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
    // @ts-ignore
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
export const removeAllSpace = (value?: string | null): string =>
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
  const STORAGE_KEY = "foUILanguage";
  const DEFAULT_LANG = "en";
  const SUPPORTED_LANGs = ["en", "zh-CN"] as const;

  const storedLang = localStorage.getItem(STORAGE_KEY);
  const browserLang = navigator.language;

  const lang = storedLang || browserLang || DEFAULT_LANG;

  const finalLang = SUPPORTED_LANGs.includes(lang as any) ? lang : DEFAULT_LANG;

  localStorage.setItem(STORAGE_KEY, finalLang);

  return finalLang;
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
