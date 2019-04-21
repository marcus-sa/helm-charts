// Automatically generated

export interface ChartValues {
  affinity?: any
  apiVersion?: any
  database?: {
    address?: any
    cassandra?: {
      consistency?: any
      keySpaceStrategy?: any
      localDataCenter?: any
      replicationFactor?: any
    }
    name?: any
    password?: any
    sqlite?: {
      storage?: any
    }
    type?: any
    username?: any
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
  jobPlatform?: any
  kubernetesUrl?: any
  nameOverride?: any
  namespace?: any
  nodeSelector?: any
  resources?: any
  service?: {
    port?: any
    sourceRange?: any
    type?: any
  }
  tolerations?: any
}

