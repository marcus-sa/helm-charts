import {ChartMeta} from '../types'
import {equals, isArrayOf, isBoolean, isNumber, isString, isStringArray, optional} from './utils'
import {validateChartMaintainer} from './validateChartMaintainer'

export function validateChartMeta(val: unknown): val is ChartMeta {
  let valid = false
  if (typeof val === 'object') {
    const chartMeta = val as ChartMeta
    valid = [
      optional(equals, chartMeta.apiVersion, 'v1' as const),
      isString(chartMeta.name),
      isString(chartMeta.version),
      optional(isString, chartMeta.kubeVersion),
      optional(isString, chartMeta.description),
      optional(isStringArray, chartMeta.keywords),
      optional(isString, chartMeta.home),
      optional(isStringArray, chartMeta.sources),
      optional(isArrayOf, chartMeta.maintainers, validateChartMaintainer),
      optional(isString, chartMeta.engine),
      optional(isString, chartMeta.icon),
      optional(isString, chartMeta.appVersion) || optional(isNumber, chartMeta.appVersion),
      optional(isBoolean, chartMeta.deprecated),
      optional(isString, chartMeta.tillerVersion),
      optional(isStringArray, chartMeta.urls),
    ].every(test => test)
  }

  if (!valid) {
    throw new Error(`Invalid chart meta: ${JSON.stringify(val)}`)
  }

  return valid
}
