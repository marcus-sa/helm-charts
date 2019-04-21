// Automatically generated

export interface ChartValues {
  affinity?: any
  chain?: {
    extraSeeds?: any
    nodes?: any
    testing?: any
  }
  config?: any
  contracts?: {
    deploy?: any
    enabled?: any
    image?: any
    tag?: any
  }
  environment?: {
    inline?: any
    secrets?: any
  }
  extraArgs?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  livenessProbe?: {
    enabled?: any
    initialDelaySeconds?: any
    path?: any
    periodSeconds?: any
    timeoutSeconds?: any
  }
  nameOverride?: any
  nodeSelector?: any
  organization?: any
  peer?: {
    ingress?: {
      enabled?: any
      hosts?: any
    }
    service?: {
      port?: any
      type?: any
    }
  }
  persistence?: {
    accessMode?: any
    annotations?: any
    enabled?: any
    size?: any
    storageClass?: any
  }
  podAnnotations?: any
  podLabels?: any
  readinessProbe?: {
    enabled?: any
    initialDelaySeconds?: any
    path?: any
  }
  resources?: any
  rpcGRPC?: {
    enabled?: any
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      tls?: any
    }
    service?: {
      loadBalance?: any
      node?: any
      port?: any
      type?: any
    }
  }
  rpcInfo?: {
    enabled?: any
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      partial?: any
      pathLeader?: any
      tls?: any
    }
    service?: {
      loadBalance?: any
      node?: any
      port?: any
      type?: any
    }
  }
  rpcMetrics?: {
    blockSampleSize?: any
    enabled?: any
    path?: any
    port?: any
  }
  rpcProfiler?: {
    enabled?: any
    port?: any
  }
  tolerations?: any
  validatorAddresses?: any
}

