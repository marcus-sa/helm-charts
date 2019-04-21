// Automatically generated

export interface ChartValues {
  cluster?: {
    address?: any
    port?: any
  }
  compact?: {
    annotations?: any
    enabled?: any
    http?: {
      port?: any
    }
    logLevel?: any
    monitoring?: {
      enabled?: any
    }
    resources?: any
    securityContext?: any
  }
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    labels?: any
  }
  nameOverride?: any
  objstore?: {
    config?: any
    configFile?: any
    gcsCredentials?: any
    provider?: any
  }
  query?: {
    annotations?: any
    enabled?: any
    grpc?: {
      port?: any
    }
    http?: {
      port?: any
    }
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      labels?: any
      path?: any
      tls?: any
    }
    logLevel?: any
    monitoring?: {
      enabled?: any
    }
    replicaCount?: any
    resources?: any
    securityContext?: any
  }
  replicaLabelName?: any
  store?: {
    annotations?: any
    enabled?: any
    grpc?: {
      port?: any
    }
    http?: {
      port?: any
    }
    logLevel?: any
    monitoring?: {
      enabled?: any
    }
    replicaCount?: any
    resources?: any
    securityContext?: any
  }
}

