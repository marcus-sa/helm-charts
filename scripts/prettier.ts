import prettier from 'prettier'

const prettierOpts = {
  printWidth: 120,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: false,
} as const

export function formatJSON(source: string) {
  return prettier.format(source, {...prettierOpts, parser: 'json'})
}

export function formatMarkdown(source: string) {
  return prettier.format(source, {...prettierOpts, parser: 'markdown'})
}

export function formatTS(source: string) {
  return prettier.format(source, {...prettierOpts, parser: 'typescript'})
}
