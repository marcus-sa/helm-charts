// Automatically generated

export interface ChartValues {
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  keycloak?: {
    ingress?: {
      annotations?: any
      enabled?: any
      hostname?: any
      tls?: any
    }
    loglevel?: any
    password?: any
    resources?: any
    service?: {
      annotations?: any
      labels?: any
      nodePort?: any
      port?: any
      type?: any
    }
    username?: any
  }
  nameOverride?: any
  postgresql?: {
    nameOverride?: any
    postgresDatabase?: any
    postgresUser?: any
  }
}

