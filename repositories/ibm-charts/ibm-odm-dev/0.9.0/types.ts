// Automatically generated

export interface ChartValues {
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
  nameOverride?: any
  resources?: any
  service?: {
    type?: any
  }
}

