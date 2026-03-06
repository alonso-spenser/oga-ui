/**
 * Array is empty
 * @param arr
 */
export const isArrayNotEmpty = (arr: any[]) => {
  return !arr || (Array.isArray(arr) && arr.length === 0);
}

/**
 * native function?
 * @param fn Function | Type Function
 */

export const isNative = (fn: Function) => {
  return typeof fn === 'function' && /\{\s*\[native code]\s*}/.test(fn.toString());
}

/**
 * is Function
 * @param fn Function | Type Function
 */

export const isFunction = (fn: Function) => {
  return !isNative(fn)
}

/**
 * Check whether a value is empty.
 * Empty means: null, undefined, or only whitespace.
 */
export const isEmpty = (value: string | null | undefined): boolean => {
  return value == null || value.trim().length === 0
}

/**
 * Check whether a value is not empty.
 */
export const isNotEmpty = (value: string | null | undefined): boolean => {
  return !isEmpty(value)
}

/**
 * Must have value
 */
export const haveValue = (value: any): boolean => {
  return value != null
}

/**
 * Clear html tag
 * @param html HTML
 * @param tagName Tag name
 * @param attrName Attributes：width|height
 */
export const filterHTML = (html: string, tagName: string, attrName: string) => {
  const reg = RegExp('(' + attrName + ')\\s*=\\s*[\'"][^\'"]+[\'"]', 'gi')
  return html.replace(RegExp('<' + tagName + '\\s+[^>]+>', 'gi'), (tag) => {
    return tag.replace(reg, '')
  })
}

/**
 * Check whether a value is a positive integer (greater than 0).
 */
export const isPositiveInteger = (value: unknown): boolean => {
  if (typeof value === 'number') {
    return Number.isInteger(value) && value > 0
  }

  if (typeof value === 'string') {
    return /^[1-9]\d*$/.test(value)
  }

  return false
}

/**
 * Get file extension
 * @param fileName string
 * @returns string
 */
export const getSuffix = (fileName: string): string => {
  const index = fileName.lastIndexOf('.')
  return index === -1 ? '' : fileName.substring(index + 1).toLowerCase()
}

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
}

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
 * Format number
 * @param num
 */
export const formatNumber = (num: number) => {
  const units = ["", "K", "M", "B", "T"]
  let i = 0

  while (num >= 1000 && i < units.length - 1) {
    num /= 1000
    i++
  }
  return num.toFixed(1).replace(/\.0$/, "") + units[i]
}

/**
 * Format number
 * @param num
 */
export const formatNumberLocation = (num: number) => {
  try {
    return num.toLocaleString('en-US')
  } catch (e){
    return num
  }
}