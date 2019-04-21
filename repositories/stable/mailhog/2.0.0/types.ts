// Automatically generated

export interface ChartValues {
  auth?: {
    enabled?: any
    existingKeySecret?: any
    existingSecret?: any
    fileContents?: any
    fileName?: any
  }
  env?: any
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
      enabled?: any
      existingSecret?: any
      secretAnnotations?: any
      secretContents?: any
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
      smtp?: any
    }
    port?: {
      http?: any
      smtp?: any
    }
    type?: any
  }
}

