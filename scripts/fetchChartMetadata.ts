import fs from 'fs-extra'
import path from 'path'
import {readRepository} from './chartFetcher'

async function fetchRepoMetadata(url: string, dir: string) {
  const repo = await readRepository(url)

  for (const name of Object.keys(repo.entries)) {
    await fs.ensureDir(path.join(dir, name))
    for (const chart of repo.entries[name]) {
      await fs.ensureDir(path.join(dir, name, chart.version))
    }
  }
}

async function run() {
  await fetchRepoMetadata('https://kubernetes-charts.storage.googleapis.com', 'stable/charts')
}

run().catch(err => {
  console.error(err.stack)
  process.exit(1)
})
