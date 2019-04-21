// Automatically generated

export interface ChartValues {
  docker?: {
    enabled?: any
    host?: any
    port?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    tls?: any
  }
  nameOverride?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
  }
  replicaCount?: any
  resources?: any
  service?: {
    annotations?: any
    externalPort?: any
    internalPort?: any
    livenessProbe?: {
      initialDelaySeconds?: any
      periodSeconds?: any
    }
    name?: any
    readinessProbe?: {
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
    }
    type?: any
  }
}

