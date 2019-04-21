import fg from 'fast-glob'
import fs from 'fs-extra'
import yaml, {JSON_SCHEMA} from 'js-yaml'
import path from 'path'
import {Chart} from '../types'
import {validateChartMeta} from '../validation/validateChartMeta'
import {buildDetectedType} from './buildDetectedType'

async function fetchChartMeta(dir: string) {
  const fileContents = await fs.readFile(path.join(dir, 'Chart.yaml'))
  return yaml.safeLoad(fileContents.toString('utf8'), {schema: JSON_SCHEMA})
}

const VALUES_REGEX = /\.Values\.([\w-.]+)/gm

function extractValues(template: string) {
  const matches = template.match(VALUES_REGEX)
  if (!matches) {
    return []
  }

  return matches.map(match => match.replace(/^\.Values\./, ''))
}

export async function parseChart(dir: string): Promise<Chart> {
  const meta = await fetchChartMeta(dir)
  if (!validateChartMeta(meta)) {
    throw new Error(`invalid chart meta: ${JSON.stringify(meta)}`)
  }

  const templates = await fg<string>(path.join(dir, 'templates', '**'))

  const values = new Set<string>()
  for (const templateFile of templates) {
    const contents = (await fs.readFile(templateFile)).toString('utf8')
    const extractedValues = extractValues(contents)
    for (const value of extractedValues) {
      values.add(value)
    }
  }
  const valuesArray = [...values].sort()

  const detectedType = buildDetectedType(valuesArray)

  const valuesYAMLPath = path.join(dir, 'values.yaml')
  console.log(valuesYAMLPath)
  const valuesYAML = (await fs.pathExists(valuesYAMLPath))
    ? (await fs.readFile(valuesYAMLPath)).toString('utf8')
    : undefined

  const readmePath = path.join(dir, 'README.md')
  const readme = (await fs.pathExists(readmePath)) ? (await fs.readFile(readmePath)).toString('utf8') : undefined

  return {dir, meta, detectedType, readme, valuesYAML}
}
