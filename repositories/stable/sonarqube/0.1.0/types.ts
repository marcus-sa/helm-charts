// Automatically generated

export interface ChartValues {
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
  nodeSelector?: any
  persistence?: {
    accessMode?: any
    confVolumeSize?: any
    dataVolumeSize?: any
    enabled?: any
    existingClaim?: any
    extensionsVolumeSize?: any
    storageClass?: any
  }
  postgresql?: {
    postgresDatabase?: any
    postgresUser?: any
  }
  replicaCount?: any
  resources?: any
  service?: {
    externalPort?: any
    internalPort?: any
    name?: any
    type?: any
  }
}

