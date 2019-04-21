export function equals<T>(val: unknown, type: T): val is T {
  return val === type
}

export function isBoolean(val: unknown): val is boolean {
  return typeof val === 'boolean'
}

export function isNull(val: unknown): val is null {
  return val == null
}

export function isNumber(val: unknown): val is number {
  return typeof val === 'number'
}

export function isStringMapOf<T>(val: unknown, test: (val: unknown) => val is T): val is {[key: string]: T} {
  if (typeof val !== 'object' || val === null) {
    return false
  }

  const obj = val as {[key: string]: T}
  const keys = Object.keys(obj)
  return keys.every(key => test(obj[key]))
}

export function isString(val: unknown): val is string {
  return typeof val === 'string'
}

export function isUndefined(val: unknown): val is undefined {
  return val == undefined
}

export function isArrayOf<T>(val: unknown, test: (val: unknown) => val is T): val is T[] {
  return Array.isArray(val) && (val as unknown[]).every(test)
}

export function optional<T, R>(
  test: (val: unknown, ...args: R[]) => val is T,
  val: unknown,
  ...args: R[]
): val is T | undefined | null {
  return isUndefined(val) || isNull(val) || test(val, ...args)
}

export function isStringArray(val: unknown): val is string[] {
  return isArrayOf(val, isString)
}
