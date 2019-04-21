// Automatically generated

export interface ChartValues {
  affinity?: any
  auth?: any
  existingSecret?: any
  exporter?: {
    enabled?: any
    image?: any
    port?: any
    pullPolicy?: any
    resources?: any
    scrapePath?: any
    tag?: any
  }
  extraArgs?: any
  fullnameOverride?: any
  hostPath?: {
    chown?: any
    path?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  init?: {
    resources?: any
  }
  labels?: any
  nameOverride?: any
  nodeSelector?: any
  persistentVolume?: {
    accessModes?: any
    annotations?: any
    enabled?: any
    size?: any
    storageClass?: any
  }
  podAnnotations?: any
  podDisruptionBudget?: any
  redis?: {
    config?: any
    customConfig?: any
    masterGroupName?: any
    port?: any
    resources?: any
  }
  redisPassword?: any
  replicas?: any
  securityContext?: {
    runAsUser?: any
  }
  sentinel?: {
    config?: any
    customConfig?: any
    port?: any
    quorum?: any
    resources?: any
  }
  serviceAnnotations?: any
  tolerations?: any
}

