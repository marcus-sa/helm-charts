// Automatically generated

export interface ChartValues {
  ceImage?: any
  dbDatabase?: any
  dbHost?: any
  dbPassword?: any
  dbUsername?: any
  edition?: any
  eeImage?: any
  externalUrl?: any
  gitlabRootPassword?: any
  httpPort?: any
  httpsPort?: any
  imagePullPolicy?: any
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    tls?: any
  }
  mattermostPort?: any
  nameOverride?: any
  nodeExporterPort?: any
  omnibusConfigRuby?: any
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
    gitlabRegistry?: {
      accessMode?: any
      enabled?: any
      size?: any
      storageClass?: any
    }
  }
  postReconfigureScript?: any
  postgresql?: {
    enabled?: any
    postgresDatabase?: any
    postgresPassword?: any
    postgresUser?: any
  }
  prometheusPort?: any
  redis?: {
    enabled?: any
    redisPassword?: any
  }
  redisHost?: any
  redisPassword?: any
  registryPort?: any
  resources?: any
  serviceAnnotations?: any
  serviceType?: any
  sshPort?: any
  workhorsePort?: any
}

