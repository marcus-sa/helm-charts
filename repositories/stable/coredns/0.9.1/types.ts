// Automatically generated

export interface ChartValues {
  affinity?: any
  clusterIP?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  isClusterService?: any
  nameOverride?: any
  plugins?: {
    kubernetes?: {
      enabled?: any
    }
    prometheus?: {
      enabled?: any
      port?: any
    }
  }
  rbac?: {
    create?: any
    serviceAccountName?: any
  }
  replicaCount?: any
  resources?: any
  serviceProtocol?: any
  serviceType?: any
  tolerations?: any
  zoneFiles?: any
}

