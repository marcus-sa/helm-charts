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
    enabled?: any
    size?: any
    storageclass?: any
  }
  puppet_forge?: {
    cache?: {
      size?: any
      ttl?: any
    }
    module_dir?: any
    url?: any
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

