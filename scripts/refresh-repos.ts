import axios from 'axios'
import fs from 'fs-extra'
import yaml, {JSON_SCHEMA} from 'js-yaml'
import path from 'path'
import {readRepository} from './chartFetcher'

interface Repo {
  name: string
  url: string
}

// These repos contain chart metadata that does not pass validation
const BLACKLISTED_REPOS = ['ibm-charts', 'hephy']

async function run() {
  const res = await axios.get('https://raw.githubusercontent.com/helm/hub/master/config/repo-values.yaml')
  const repos: Repo[] = yaml
    .safeLoad(res.data, {schema: JSON_SCHEMA})
    .sync.repos.filter((repo: Repo) => !BLACKLISTED_REPOS.includes(repo.name))

  for (const repo of repos) {
    const repoDir = path.join(process.cwd(), 'repositories', repo.name)

    await fs.ensureDir(repoDir)
    await fs.writeJSON(path.join(repoDir, 'meta.json'), repo)

    console.log(repo.url)
    console.log(`Initialized ${repo.name}`)
    const data = await readRepository(repo.url)
    await fs.writeJSON(path.join(repoDir, 'charts.json'), data)
  }
}

run().catch(err => {
  console.error(err.stack)
  process.exit(1)
})
