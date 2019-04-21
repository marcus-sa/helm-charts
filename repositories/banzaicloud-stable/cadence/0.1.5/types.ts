// Automatically generated

export interface ChartValues {
  affinity?: any
  cassandra?: {
    consistency?: any
    keyspace?: any
  }
  cassandraVisibilityKeyspace?: any
  fullnameOverride?: any
  nameOverride?: any
  nodeSelector?: any
  replicaCount?: any
  resources?: any
  server?: {
    bindOnLocalHost?: any
    frontend?: {
      bindOnIP?: any
      enabled?: any
      service?: {
        port?: any
        type?: any
      }
    }
    history?: {
      bindOnIP?: any
      enabled?: any
      numHistoryShards?: any
      service?: {
        port?: any
        type?: any
      }
    }
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    logLevel?: any
    matching?: {
      bindOnIP?: any
      enabled?: any
      service?: {
        port?: any
        type?: any
      }
    }
    worker?: {
      bindOnIP?: any
      enabled?: any
      service?: {
        port?: any
        type?: any
      }
    }
  }
  tolerations?: any
  web?: {
    affinity?: any
    enabled?: any
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
    nodeSelector?: any
    replicaCount?: any
    resources?: any
    service?: {
      port?: any
      type?: any
    }
    tolerations?: any
  }
}

