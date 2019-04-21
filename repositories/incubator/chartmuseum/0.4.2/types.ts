// Automatically generated

export interface ChartValues {
  affinity?: any
  deployment?: {
    annotations?: any
  }
  env?: {
    open?: {
      CONTEXT_PATH?: any
      STORAGE?: any
    }
    secret?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    labels?: any
    tls?: any
  }
  nodeSelector?: any
  persistence?: {
    AccessMode?: any
    Enabled?: any
    ExistingClaim?: any
    Size?: any
    StorageClass?: any
    VolumeName?: any
  }
  replica?: {
    annotations?: any
  }
  replicaCount?: any
  resources?: any
  service?: {
    annotations?: any
    externalPort?: any
    internalPort?: any
    nodePort?: any
    type?: any
  }
  strategy?: any
  tolerations?: any
}

