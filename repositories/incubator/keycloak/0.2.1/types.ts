// Automatically generated

export interface ChartValues {
  fullnameOverride?: any
  hyperkube?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
  }
  keycloak?: {
    additionalEnv?: any
    cli?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    ingress?: {
      enabled?: any
      hosts?: any
      tls?: {
        enabled?: any
        existingSecret?: any
      }
    }
    nodeSelector?: any
    password?: any
    persistence?: {
      dbHost?: any
      dbName?: any
      dbPassword?: any
      dbPort?: any
      dbUser?: any
      dbVendor?: any
      deployPostgres?: any
      existingSecret?: any
      existingSecretKey?: any
    }
    podAntiAffinity?: any
    replicas?: any
    resources?: any
    service?: {
      port?: any
      type?: any
    }
    tolerations?: any
    username?: any
  }
  nameOverride?: any
  postgresql?: {
    nameOverride?: any
    postgresDatabase?: any
    postgresUser?: any
  }
  rbac?: {
    create?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  test?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
  }
}

