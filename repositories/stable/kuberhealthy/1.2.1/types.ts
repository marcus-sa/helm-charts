// Automatically generated

export interface ChartValues {
  deployment?: {
    args?: any
    command?: any
    imagePullPolicy?: any
    maxSurge?: any
    maxUnavailable?: any
    podAnnotations?: any
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
  securityContext?: any
  service?: {
    externalPort?: any
    type?: any
  }
  tolerations?: {
    master?: any
  }
}

