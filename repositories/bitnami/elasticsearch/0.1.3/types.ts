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
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
    repository?: any
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
    name?: any
    resources?: any
  }
  name?: any
  nameOverride?: any
  plugins?: any
  pullPolicy?: any
  serviceAccountName?: any
}

