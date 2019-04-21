// Automatically generated

export interface ChartValues {
  arch?: any
  autoscaling?: {
    enabled?: any
    maxReplicas?: any
    minReplicas?: any
    targetCPUUtilizationPercentage?: any
  }
  configProperties?: {
    configMapName?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    enabled?: any
    path?: any
    rewriteTarget?: any
  }
  livenessProbe?: {
    httpGet?: {
      enabled?: any
      path?: any
    }
    initialDelaySeconds?: any
    periodSeconds?: any
  }
  logs?: {
    persistLogs?: any
  }
  nameOverride?: any
  persistence?: {
    fsGroupGid?: any
    name?: any
    selector?: {
      label?: any
      value?: any
    }
    size?: any
    storageClassName?: any
    useDynamicProvisioning?: any
  }
  readinessProbe?: {
    httpGet?: {
      enabled?: any
      path?: any
    }
    initialDelaySeconds?: any
    periodSeconds?: any
  }
  replicaCount?: any
  resources?: {
    constraints?: {
      enabled?: any
    }
    limits?: any
    requests?: any
  }
  service?: {
    name?: any
    port?: any
    targetPort?: any
    type?: any
  }
}

