// Automatically generated

export interface ChartValues {
  arch?: any
  confdPVC?: {
    accessMode?: any
    enabled?: any
    existingClaimName?: any
    selector?: {
      label?: any
      value?: any
    }
  }
  configMapName?: any
  htmlPVC?: {
    accessMode?: any
    enabled?: any
    existingClaimName?: any
    selector?: {
      label?: any
      value?: any
    }
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  liveness?: {
    enabled?: any
    initialDelaySeconds?: any
    path?: any
    periodSeconds?: any
  }
  nameOverride?: any
  readiness?: {
    enabled?: any
    initialDelaySeconds?: any
    path?: any
    periodSeconds?: any
  }
  replicaCount?: any
  resources?: any
  service?: {
    externalPort?: any
    port?: any
  }
}

