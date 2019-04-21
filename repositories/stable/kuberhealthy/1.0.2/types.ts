// Automatically generated

export interface ChartValues {
  deployment?: {
    imagePullPolicy?: any
    maxSurge?: any
    maxUnavailable?: any
    replicas?: any
  }
  image?: {
    repository?: any
    tag?: any
  }
  nameOverride?: any
  prometheus?: {
    enableAlerting?: any
    enableScraping?: any
    enabled?: any
    name?: any
    serviceMonitor?: any
  }
  resources?: {
    requests?: {
      cpu?: any
      memory?: any
    }
  }
  service?: {
    externalPort?: any
    type?: any
  }
  tolerations?: {
    master?: any
  }
}

