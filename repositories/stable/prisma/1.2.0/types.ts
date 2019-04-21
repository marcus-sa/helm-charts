// Automatically generated

export interface ChartValues {
  affinity?: any
  auth?: {
    enabled?: any
    secret?: any
  }
  database?: {
    connector?: any
    host?: any
    migrations?: any
    password?: any
    port?: any
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
  nameOverride?: any
  nodeSelector?: any
  postgresql?: {
    enabled?: any
    nameOverride?: any
    service?: {
      port?: any
    }
  }
  resources?: any
  service?: {
    port?: any
    type?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  tolerations?: any
}

