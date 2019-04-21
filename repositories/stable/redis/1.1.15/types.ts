// Automatically generated

export interface ChartValues {
  args?: any
  image?: any
  imagePullPolicy?: any
  metrics?: {
    annotations?: any
    enabled?: any
    image?: any
    imagePullPolicy?: any
    imageTag?: any
    resources?: any
  }
  nameOverride?: any
  networkPolicy?: {
    allowExternal?: any
    enabled?: any
  }
  nodeSelector?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    path?: any
    size?: any
    storageClass?: any
    subPath?: any
  }
  podAnnotations?: any
  podLabels?: any
  redisExtraFlags?: any
  redisPassword?: any
  resources?: any
  securityContext?: {
    enabled?: any
    fsGroup?: any
    runAsUser?: any
  }
  service?: {
    annotations?: any
    loadBalancerIP?: any
  }
  serviceType?: any
  tolerations?: any
  usePassword?: any
}

