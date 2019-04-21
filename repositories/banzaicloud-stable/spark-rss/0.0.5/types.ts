// Automatically generated

export interface ChartValues {
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
    tls?: any
  }
  nameOverride?: any
  podSecurityPolicy?: {
    create?: any
  }
  rbac?: {
    create?: any
    role?: {
      rules?: any
    }
  }
  replicaCount?: any
  resources?: any
  service?: {
    internalPort?: any
    port?: any
    type?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  tls?: {
    enabled?: any
    name?: any
  }
}

