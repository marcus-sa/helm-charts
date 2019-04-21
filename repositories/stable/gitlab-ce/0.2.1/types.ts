// Automatically generated

export interface ChartValues {
  externalUrl?: any
  gitlabRootPassword?: any
  httpPort?: any
  httpsPort?: any
  image?: any
  imagePullPolicy?: any
  ingress?: {
    annotations?: any
    enabled?: any
    tls?: any
    url?: any
  }
  livenessPort?: any
  nameOverride?: any
  persistence?: {
    gitlabData?: {
      accessMode?: any
      enabled?: any
      size?: any
      storageClass?: any
    }
    gitlabEtc?: {
      accessMode?: any
      enabled?: any
      size?: any
      storageClass?: any
    }
  }
  postgresql?: {
    postgresDatabase?: any
    postgresPassword?: any
    postgresUser?: any
  }
  readinessPort?: any
  redis?: {
    redisPassword?: any
  }
  resources?: any
  serviceType?: any
  sshPort?: any
}

