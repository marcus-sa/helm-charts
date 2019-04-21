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
    secret?: {
      GOOGLE_CREDENTIALS_JSON?: any
    }
  }
  fullnameOverride?: any
  fullnamePrefix?: any
  fullnameSuffix?: any
  gcp?: {
    secret?: {
      enabled?: any
      key?: any
      name?: any
    }
  }
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
  securityContext?: any
  service?: {
    annotations?: any
    externalPort?: any
    nodePort?: any
    type?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  strategy?: any
  tolerations?: any
}

