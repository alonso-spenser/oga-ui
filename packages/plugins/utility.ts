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
