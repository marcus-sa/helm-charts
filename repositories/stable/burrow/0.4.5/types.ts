// Automatically generated

export interface ChartValues {
  affinity?: any
  chain?: {
    extraSeeds?: any
    id?: any
    logLevel?: any
    numberOfNodes?: any
  }
  env?: any
  extraArgs?: any
  genesisFile?: any
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
  keysFiles?: any
  nameOverride?: any
  nodeSelector?: any
  organization?: any
  persistence?: {
    accessMode?: any
    annotations?: any
    enabled?: any
    size?: any
    storageClass?: any
  }
  podAnnotations?: any
  podLabels?: any
  resources?: any
  service?: {
    api?: {
      loadBalance?: any
      node?: any
      port?: any
      type?: any
    }
    peer?: {
      port?: any
      type?: any
    }
    rpc?: {
      loadBalance?: any
      node?: any
      port?: any
      type?: any
    }
  }
  tolerations?: any
}

