import fg from 'fast-glob'
import fs from 'fs-extra'
import path from 'path'
import {ChartRepository} from './types'

async function prepareChartDirectories(repo: ChartRepository, dir: string) {
  for (const name of Object.keys(repo.entries)) {
    await fs.ensureDir(path.join(dir, name))
    for (const chart of repo.entries[name]) {
      await fs.ensureDir(path.join(dir, name, chart.version))
      await fs.writeJSON(path.join(dir, name, chart.version, 'chart.json'), chart)
    }
  }
}

async function run() {
  const repositories = await fg<string>('repositories/*/charts.json')

  for (const chartsFile of repositories) {
    const repo: ChartRepository = await fs.readJSON(chartsFile)
    await prepareChartDirectories(repo, path.dirname(chartsFile))
  }
}

run().catch(err => {
  console.error(err.stack)
  process.exit(1)
})
