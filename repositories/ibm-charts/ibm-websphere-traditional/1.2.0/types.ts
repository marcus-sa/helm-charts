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
  deployment?: {
    annotations?: any
    labels?: any
  }
  image?: {
    extraEnvs?: any
    extraVolumeMounts?: any
    pullPolicy?: any
    repository?: any
    security?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    labels?: any
    path?: any
    rewriteTarget?: any
    secretName?: any
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
  pod?: {
    annotations?: any
    extraVolumes?: any
    labels?: any
    security?: any
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
    annotations?: any
    labels?: any
    name?: any
    port?: any
    targetPort?: any
    type?: any
  }
}

