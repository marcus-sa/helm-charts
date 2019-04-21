// Automatically generated

export interface ChartValues {
  configuration?: {
    extraEnvVars?: any
    provider?: any
  }
  credentials?: {
    existingSecret?: any
    secretContents?: any
    useSecret?: any
  }
  deployRestic?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  initContainers?: any
  metrics?: {
    enabled?: any
    podAnnotations?: any
    scrapeInterval?: any
    serviceMonitor?: {
      additionalLabels?: any
      enabled?: any
    }
  }
  nameOverride?: any
  nodeSelector?: any
  podAnnotations?: any
  rbac?: {
    create?: any
  }
  resources?: any
  schedules?: any
  serviceAccount?: {
    server?: {
      create?: any
      name?: any
    }
  }
  tolerations?: any
}

