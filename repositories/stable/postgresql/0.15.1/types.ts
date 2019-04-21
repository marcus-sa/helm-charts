// Automatically generated

export interface ChartValues {
  affinity?: any
  deploymentAnnotations?: any
  existingSecret?: any
  fullnameOverride?: any
  image?: any
  imagePullPolicy?: any
  imagePullSecrets?: any
  imageTag?: any
  metrics?: {
    customMetrics?: any
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
    annotations?: any
    enabled?: any
    existingClaim?: any
    mountPath?: any
    size?: any
    storageClass?: any
    subPath?: any
  }
  podAnnotations?: any
  postgresConfig?: any
  postgresDatabase?: any
  postgresInitdbArgs?: any
  postgresPassword?: any
  postgresUser?: any
  probes?: {
    liveness?: {
      failureThreshold?: any
      initialDelay?: any
      timeoutSeconds?: any
    }
    readiness?: {
      initialDelay?: any
      periodSeconds?: any
      timeoutSeconds?: any
    }
  }
  resources?: any
  schedulerName?: any
  service?: {
    externalIPs?: any
    nodePort?: any
    port?: any
    type?: any
  }
  strategy?: any
  tolerations?: any
  usePasswordFile?: any
}

