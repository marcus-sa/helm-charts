// Automatically generated

export interface ChartValues {
  affinity?: any
  env?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    path?: any
    tls?: any
  }
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
  }
  resources?: {
    nginx?: any
    railsserver?: any
    scheduler?: any
    websocket?: any
  }
  service?: {
    port?: any
    type?: any
  }
  tolerations?: any
}

