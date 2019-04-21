export interface Chart {
  detectedType: string
  dir: string
  meta: ChartMeta
  readme?: string
  valuesYAML?: string
}

export interface ChartMeta {
  apiVersion: 'v1'
  name: string
  version: string
  kubeVersion?: string
  description?: string
  keywords?: string[]
  home?: string
  sources?: string[]
  maintainers?: ChartMaintainer[]
  engine?: string
  icon?: string
  appVersion?: string
  deprecated?: boolean
  tillerVersion?: string
  urls?: string[]
}

export interface ChartMaintainer {
  name: string
  email?: string
  url?: string
}

export interface ChartRepository {
  apiVersion: 'v1'
  entries: {[name: string]: ChartMeta[]}
}
