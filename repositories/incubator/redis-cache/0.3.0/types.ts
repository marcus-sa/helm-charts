// Automatically generated

export interface ChartValues {
  antiAffinity?: any
  makeSlave?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    resources?: any
  }
  microSentinel?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    resources?: any
  }
  nameOverride?: any
  podDisruptionBudget?: {
    minAvailable?: any
  }
  redis?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    resources?: any
  }
  replicaCount?: any
  service?: {
    name?: any
    port?: any
  }
}

