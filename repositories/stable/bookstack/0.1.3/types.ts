// Automatically generated

export interface ChartValues {
  app?: {
    key?: any
  }
  externalDatabase?: {
    database?: any
    host?: any
    password?: any
    user?: any
  }
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
  mariadb?: {
    db?: {
      name?: any
      user?: any
    }
    enabled?: any
  }
  nameOverride?: any
  persistence?: {
    storage?: {
      accessMode?: any
      enabled?: any
      existingClaim?: any
      size?: any
      storageClass?: any
    }
    uploads?: {
      accessMode?: any
      enabled?: any
      existingClaim?: any
      size?: any
      storageClass?: any
    }
  }
  podSecurityPolicy?: {
    enabled?: any
  }
  rbac?: {
    create?: any
  }
  replicaCount?: any
  resources?: any
  service?: {
    port?: any
    type?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
}

