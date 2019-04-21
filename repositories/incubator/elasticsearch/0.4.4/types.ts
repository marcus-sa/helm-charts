// Automatically generated

export interface ChartValues {
  appVersion?: any
  client?: {
    antiAffinity?: any
    heapSize?: any
    name?: any
    podAnnotations?: any
    replicas?: any
    resources?: any
    serviceAnnotations?: any
    serviceType?: any
  }
  cluster?: {
    config?: any
    env?: any
    name?: any
  }
  data?: {
    antiAffinity?: any
    heapSize?: any
    name?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      name?: any
      size?: any
      storageClass?: any
    }
    podAnnotations?: any
    replicas?: any
    resources?: any
    terminationGracePeriodSeconds?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  master?: {
    antiAffinity?: any
    heapSize?: any
    name?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      name?: any
      size?: any
      storageClass?: any
    }
    podAnnotations?: any
    replicas?: any
    resources?: any
  }
  nameOverride?: any
  rbac?: {
    create?: any
  }
}

