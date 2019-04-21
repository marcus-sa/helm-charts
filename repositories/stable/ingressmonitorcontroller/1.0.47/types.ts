// Automatically generated

export interface ChartValues {
  ingressMonitorController?: {
    config?: {
      annotations?: any
      labels?: any
    }
    configFilePath?: any
    deployment?: {
      annotations?: any
      labels?: any
    }
    enableMonitorDeletion?: any
    image?: {
      name?: any
      pullPolicy?: any
      tag?: any
    }
    matchLabels?: any
    monitorNameTemplate?: any
    providers?: any
    rbac?: {
      create?: any
      labels?: any
    }
    serviceAccount?: {
      create?: any
      labels?: any
      name?: any
    }
    useFullName?: any
    watchNamespace?: any
  }
  nameOverride?: any
}

