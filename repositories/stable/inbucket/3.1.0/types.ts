// Automatically generated

export interface ChartValues {
  extraEnv?: any
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
    tls?: {
      existingSecret?: any
    }
  }
  nameOverride?: any
  nodeSelector?: any
  podAnnotations?: any
  resources?: any
  service?: {
    annotations?: any
    clusterIP?: any
    externalIPs?: any
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
    nodePort?: {
      http?: any
      pop3?: any
      smtp?: any
    }
    port?: {
      http?: any
      pop3?: any
      smtp?: any
    }
    type?: any
  }
}

