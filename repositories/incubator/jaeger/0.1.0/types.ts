// Automatically generated

export interface ChartValues {
  agent?: {
    annotations?: any
    cmdlineParams?: any
    image?: any
    name?: any
    nodeSelector?: any
    pullPolicy?: any
    resources?: any
    service?: {
      annotations?: any
      binaryPort?: any
      compactPort?: any
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
    cmdlineParams?: any
    dnsPolicy?: any
    image?: any
    nodeSelector?: any
    pullPolicy?: any
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
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    tls?: any
  }
  nameOverride?: any
  query?: {
    annotations?: any
    cmdlineParams?: any
    dnsPolicy?: any
    image?: any
    nodeSelector?: any
    pullPolicy?: any
    resources?: any
    service?: {
      annotations?: any
      queryPort?: any
      targetPort?: any
      type?: any
    }
    tag?: any
  }
  schema?: {
    annotations?: any
    image?: any
    mode?: any
    pullPolicy?: any
    tag?: any
  }
  service?: {
    externalPort?: any
  }
}

