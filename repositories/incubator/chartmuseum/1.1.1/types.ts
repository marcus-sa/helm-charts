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
  fullnameOverride?: any
  fullnamePrefix?: any
  fullnameSuffix?: any
  global?: {
    fullnamePrefix?: any
    fullnameSuffix?: any
    namePrefix?: any
    nameSuffix?: any
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
  nameOverride?: any
  namePrefix?: any
  nameSuffix?: any
  nodeSelector?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
  }
  probes?: {
    liveness?: any
    readiness?: any
  }
  replica?: {
    annotations?: any
  }
  replicaCount?: any
  resources?: any
  service?: {
    annotations?: any
    externalPort?: any
    nodePort?: any
    type?: any
  }
  strategy?: any
  tolerations?: any
}

