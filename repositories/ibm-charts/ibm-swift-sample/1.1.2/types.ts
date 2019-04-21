// Automatically generated

export interface ChartValues {
  arch?: any
  hpa?: {
    enabled?: any
    maxReplicas?: any
    metrics?: {
      cpu?: {
        targetAverageUtilization?: any
      }
    }
    minReplicas?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    resources?: {
      requests?: {
        cpu?: any
        memory?: any
      }
    }
    tag?: any
  }
  livenessProbe?: {
    initialDelaySeconds?: any
    periodSeconds?: any
  }
  nameOverride?: any
  replicaCount?: any
  revisionHistoryLimit?: any
  service?: {
    name?: any
    servicePort?: any
    type?: any
  }
}

