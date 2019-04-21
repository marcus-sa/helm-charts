// Automatically generated

export interface ChartValues {
  controller?: {
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
    logLevel?: any
    service?: {
      port?: any
      type?: any
    }
    type?: any
  }
  driver?: {
    antiAffinity?: any
    antiAffinityWeight?: any
    hostAliases?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    logLevel?: any
    replicaCount?: any
    resources?: any
    service?: {
      port?: any
    }
  }
  nameOverride?: any
  serviceAccounts?: {
    controller?: {
      create?: any
      name?: any
    }
    driver?: {
      create?: any
      name?: any
    }
  }
}

