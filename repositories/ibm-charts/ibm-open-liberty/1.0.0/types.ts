// Automatically generated

export interface ChartValues {
  autoscaling?: {
    enabled?: any
    maxReplicas?: any
    minReplicas?: any
    targetCPUUtilizationPercentage?: any
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
  nameOverride?: any
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

