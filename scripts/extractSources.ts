import fg from 'fast-glob'
import fs from 'fs-extra'
import path from 'path'
import tar from 'tar'

async function run() {
  const sources = await fg<string>('charts/*/*/source.tgz')

  for (const source of sources) {
    console.log(`Extracting ${source}`)
    const cwd = path.join(path.dirname(source), 'chart')
    await fs.ensureDir(cwd)
    await tar.extract({file: source, cwd, strip: 1})
  }
}

run().catch(err => {
  console.error(err.stack)
  process.exit(1)
})
