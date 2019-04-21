import axios from 'axios'
import yaml, {JSON_SCHEMA} from 'js-yaml'
import {ChartRepository} from '../types'
import {validateRepository} from '../validation/validateRepository'

export async function readRepository(url: string) {
  const cleanedURL = url.replace(/\/$/, '')
  const indexURL = `${cleanedURL}/index.yaml`
  const index = await axios(indexURL)
  const chartRepository: ChartRepository = yaml.safeLoad(index.data, {schema: JSON_SCHEMA})

  if (!validateRepository(chartRepository)) {
    throw new Error('invalid chart repository')
  }

  // Add repository base address to URLs, if necessary
  for (const chartName of Object.keys(chartRepository.entries)) {
    const chartVersions = chartRepository.entries[chartName]
    for (const chartVersion of chartVersions) {
      if (!chartVersion.urls) {
        throw new Error(`Missing chart download URL: ${JSON.stringify(chartVersion)}`)
      }

      chartVersion.urls = chartVersion.urls.map(url => (url.startsWith('http') ? url : `${cleanedURL}/${url}`))
    }
  }

  return chartRepository
}
