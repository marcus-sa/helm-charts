import util from 'util'
import {parseChart} from './chartParser'
import {readRepository} from './chartFetcher'
import fs from 'fs-extra'
import path from 'path'

async function run() {
  const chart = await parseChart('tmp/charts/stable/nginx-ingress')
  console.log(util.inspect(chart, {depth: 8, colors: true}))

  const repo = await readRepository('https://kubernetes-charts.storage.googleapis.com')

  for (const name of Object.keys(repo.entries)) {
    await fs.ensureDir(path.join('charts', name))
    for (const chart of repo.entries[name]) {
      await fs.ensureDir(path.join('charts', name, chart.version))
    }
  }
}

run().catch(err => {
  console.error(err.stack)
  process.exit(1)
})
