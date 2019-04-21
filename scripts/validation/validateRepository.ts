import {ChartMeta, ChartRepository} from '../types'
import {equals, isArrayOf, isStringMapOf} from './utils'
import {validateChartMeta} from './validateChartMeta'

export function validateRepository(val: unknown): val is ChartRepository {
  let valid = false

  if (typeof val === 'object') {
    const chartRepo = val as ChartRepository
    valid = [
      equals(chartRepo.apiVersion, 'v1' as const),
      isStringMapOf(chartRepo.entries, (val): val is ChartMeta[] => isArrayOf(val, validateChartMeta)),
    ].every(test => test)
  }

  if (!valid) {
    throw new Error(`Invalid chart repository: ${JSON.stringify(val)}`)
  }

  return valid
}
