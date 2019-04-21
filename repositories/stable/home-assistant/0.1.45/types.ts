// Automatically generated

export interface ChartValues {
  affinity?: any
  configurator?: {
    affinity?: any
    basepath?: any
    enabled?: any
    enforceBasepath?: any
    extraEnv?: any
    hassApiPassword?: any
    hassApiUrl?: any
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
    nodeSelector?: any
    password?: any
    replicaCount?: any
    resources?: any
    service?: {
      annotations?: any
      clusterIP?: any
      externalIPs?: any
      labels?: any
      loadBalancerIP?: any
      loadBalancerSourceRanges?: any
      nodePort?: any
      port?: any
      type?: any
    }
    tolerations?: any
    username?: any
  }
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
    tls?: any
  }
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
  }
  replicaCount?: any
  resources?: any
  service?: {
    annotations?: any
    clusterIP?: any
    externalIPs?: any
    labels?: any
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
    nodePort?: any
    port?: any
    type?: any
  }
  tolerations?: any
}

