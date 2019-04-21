import fs from 'fs-extra'
import path from 'path'
import axios from 'axios'
import {readRepository} from './chartFetcher'

async function run() {
  const repo = await readRepository('https://kubernetes-charts.storage.googleapis.com')

  for (const name of Object.keys(repo.entries)) {
    await fs.ensureDir(path.join('charts', name))
    for (const chart of repo.entries[name]) {
      await fs.ensureDir(path.join('charts', name, chart.version))
      if (chart.urls) {
        const url = chart.urls[0]
        const res = await axios.get(url, {responseType: 'stream'})
        res.data.pipe(fs.createWriteStream(path.join('charts', name, chart.version, 'source.tgz')))
      }
    }
  }
}

run().catch(err => {
  console.error(err.stack)
  process.exit(1)
})
