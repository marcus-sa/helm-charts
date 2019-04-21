// Automatically generated

export interface ChartValues {
  config?: {
    enabledFeatureListers?: any
    enabledNamespaceDetectors?: any
    enabledUpdaters?: any
    notificationWebhookEndpoint?: any
    paginationKey?: any
    postgresURI?: any
    updateInterval?: any
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
  insecureTls?: any
  logLevel?: any
  nameOverride?: any
  postgresql?: {
    postgresDatabase?: any
    postgresPassword?: any
    postgresUser?: any
  }
  replicaCount?: any
  resources?: any
  service?: {
    externalApiPort?: any
    externalHealthPort?: any
    internalApiPort?: any
    internalHealthPort?: any
    name?: any
    type?: any
  }
}

