// Automatically generated

export interface ChartValues {
  affinity?: any
  configurator?: {
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
    password?: any
    resources?: any
    service?: {
      nodePort?: any
      port?: any
      type?: any
    }
    username?: any
  }
  extraEnv?: any
  extraEnvSecrets?: any
  fullnameOverride?: any
  git?: {
    enabled?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    keyPath?: any
    repo?: any
    secret?: any
    syncPath?: any
  }
  hostNetwork?: any
  image?: {
    pullPolicy?: any
    pullSecrets?: any
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
  strategyType?: any
  tolerations?: any
}

