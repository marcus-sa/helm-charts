// Automatically generated

export interface ChartValues {
  annotations?: any
  controller?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    stats?: {
      address?: any
      port?: any
    }
    statsd?: {
      enabled?: any
    }
  }
  fullnameOverride?: any
  nameOverride?: any
  nodeSelector?: any
  podDisruptionBudget?: {
    enabled?: any
    maxUnavailable?: any
    minAvailable?: any
  }
  proxy?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
  }
  rbac?: {
    enabled?: any
  }
  replicaCount?: any
  service?: {
    annotations?: any
    externalPort?: any
    loadBalancerIP?: any
    type?: any
  }
  tolerations?: any
}

