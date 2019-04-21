import {ChartMaintainer} from '../types'
import {isString, optional} from './utils'

export function validateChartMaintainer(val: unknown): val is ChartMaintainer {
  let valid = false
  if (typeof val === 'object') {
    const chartMaintainer = val as ChartMaintainer
    valid = [
      isString(chartMaintainer.name),
      optional(isString, chartMaintainer.email),
      optional(isString, chartMaintainer.url),
    ].every(test => test)
  }

  if (!valid) {
    throw new Error(`Invalid chart maintainer: ${JSON.stringify(val)}`)
  }

  return valid
}
