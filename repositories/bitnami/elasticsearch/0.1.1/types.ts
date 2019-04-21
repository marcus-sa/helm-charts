// Automatically generated

export interface ChartValues {
  client?: {
    antiAffinity?: any
    heapSize?: any
    name?: any
    replicas?: any
    resources?: any
    service?: {
      port?: any
      type?: any
    }
  }
  config?: any
  data?: {
    antiAffinity?: any
    heapSize?: any
    name?: any
    persistence?: {
      accessModes?: any
      annotations?: any
      enabled?: any
      size?: any
      storageClass?: any
    }
    replicas?: any
    resources?: any
  }
  image?: {
    name?: any
    pullPolicy?: any
    tag?: any
  }
  master?: {
    antiAffinity?: any
    heapSize?: any
    name?: any
    replicas?: any
    resources?: any
  }
  metrics?: {
    annotations?: any
    enabled?: any
    image?: {
      name?: any
      pullPolicy?: any
      tag?: any
    }
    name?: any
    resources?: any
  }
  name?: any
  nameOverride?: any
  plugins?: any
  serviceAccountName?: any
}

