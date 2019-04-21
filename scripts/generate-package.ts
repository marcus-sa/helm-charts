import fs from 'fs-extra'
import path from 'path'
import pkg from '../package.json'
import {parseChart} from './chartParser'
import {formatJSON, formatMarkdown} from './prettier'

async function run() {
  const source = process.argv[2]

  const [basePath, repoName, chartName, version] = source.split('/')
  const dir = [basePath, repoName, chartName, version].join('/')

  console.log(`Building ${dir}`)

  const chart = await parseChart(path.join(dir, 'chart'))
  const meta = chart.meta

  const chartPkg = {
    name: `@helm-charts/${repoName}-${meta.name}`,
    version: `${meta.version}-${pkg.version}`,
    description: meta.description,
    license: 'MIT',
    sideEffects: false,
    main: './index.js',
    types: './index.d.ts',
    files: ['chart', './*.js', './*.ts', './*.map'],
    dependencies: {
      tslib: pkg.dependencies.tslib,
    },
  }

  await fs.writeFile(path.join(dir, 'package.json'), formatJSON(JSON.stringify(chartPkg)))
  await fs.writeFile(
    path.join(dir, 'index.ts'),
    `export * from './types'
`,
  )
  await fs.writeFile(
    path.join(dir, 'types.ts'),
    `// Automatically generated

export ${chart.detectedType}
`,
  )

  const valuesYAML = chart.valuesYAML
    ? `
<details>

<summary>Helm chart \`values.yaml\` (default values)</summary>

\`\`\`yaml
${chart.valuesYAML}
\`\`\`

</details>
  `.trim()
    : ''

  const readme = `
# \`@helm-charts/${repoName}-${meta.name}\`

${meta.description || ''}

Field | Value
--- | ---
Repository Name | ${repoName}
Chart Name | ${meta.name}
Chart Version | ${meta.version}
NPM Package Version | ${pkg.version}

${valuesYAML}

${chart.readme ? '------' : ''}

${chart.readme || ''}
  `.trim()

  await fs.writeFile(path.join(dir, 'README.md'), formatMarkdown(readme))
}

run().catch(err => {
  console.error(err.stack)
  process.exit(1)
})
