// Automatically generated

export interface ChartValues {
  customization?: {
    baiEmitterSecretRef?: any
  }
  decisionCenter?: {
    persistenceLocale?: any
  }
  externalDatabase?: {
    databaseName?: any
    password?: any
    port?: any
    serverName?: any
    user?: any
  }
  image?: {
    arch?: any
    pullPolicy?: any
    pullSecrets?: any
    repository?: any
    tag?: any
  }
  internalDatabase?: {
    persistence?: {
      enabled?: any
      resources?: any
      storageClassName?: any
      useDynamicProvisioning?: any
    }
    populateSampleData?: any
  }
  livenessProbe?: {
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
  }
  nameOverride?: any
  readinessProbe?: {
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
  }
  resources?: any
}

