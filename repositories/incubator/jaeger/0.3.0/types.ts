// Automatically generated

export interface ChartValues {
  agent?: {
    annotations?: any
    cmdlineParams?: any
    collector?: {
      host?: any
      port?: any
    }
    daemonset?: {
      useHostPort?: any
    }
    enabled?: any
    image?: any
    nodeSelector?: any
    podLabels?: any
    pullPolicy?: any
    resources?: any
    service?: {
      annotations?: any
      binaryPort?: any
      compactPort?: any
      nameOverride?: any
      samplingPort?: any
      type?: any
      zipkinThriftPort?: any
    }
    tag?: any
  }
  cassandra?: {
    config?: {
      dc_name?: any
    }
  }
  collector?: {
    annotations?: any
    dnsPolicy?: any
    enabled?: any
    image?: any
    nodeSelector?: any
    podLabels?: any
    pullPolicy?: any
    replicaCount?: any
    resources?: any
    service?: {
      annotations?: any
      httpPort?: any
      tchannelPort?: any
      type?: any
      zipkinPort?: any
    }
    tag?: any
  }
  hotrod?: {
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
      annotations?: any
      externalPort?: any
      internalPort?: any
      name?: any
      type?: any
    }
    tracing?: {
      host?: any
      port?: any
    }
  }
  nameOverride?: any
  provisionDataStore?: {
    cassandra?: any
    elasticsearch?: any
  }
  query?: {
    annotations?: any
    dnsPolicy?: any
    enabled?: any
    healthCheckPort?: any
    image?: any
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      tls?: any
    }
    nodeSelector?: any
    podLabels?: any
    pullPolicy?: any
    replicaCount?: any
    resources?: any
    service?: {
      annotations?: any
      queryPort?: any
      targetPort?: any
      type?: any
    }
    tag?: any
  }
  queryNameOverride?: any
  schema?: {
    annotations?: any
    image?: any
    mode?: any
    podLabels?: any
    pullPolicy?: any
    resources?: any
    tag?: any
  }
  spark?: {
    annotations?: any
    enabled?: any
    image?: any
    nodeSelector?: any
    podLabels?: any
    pullPolicy?: any
    resources?: any
    schedule?: any
    tag?: any
  }
  storage?: {
    cassandra?: {
      host?: any
      port?: any
    }
    elasticsearch?: {
      host?: any
      password?: any
      port?: any
      scheme?: any
      user?: any
    }
    type?: any
  }
}

