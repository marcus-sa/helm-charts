// Automatically generated

export interface ChartValues {
  affinity?: any
  extraVars?: any
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
    accessModes?: any
    annotations?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
  }
  podAnnotations?: any
  postgresql?: {
    install?: any
    nameOverride?: any
    postgresDatabase?: any
    postgresHost?: any
    postgresPassword?: any
    postgresUser?: any
  }
  replicaCount?: any
  resources?: any
  service?: {
    port?: any
    type?: any
  }
  sessionSecret?: any
  tolerations?: any
}

