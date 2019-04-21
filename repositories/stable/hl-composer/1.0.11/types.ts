// Automatically generated

export interface ChartValues {
  cli?: {
    affinity?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    nodeSelector?: any
    resources?: any
    secrets?: {
      adminCert?: any
      adminKey?: any
      blockchainNetwork?: any
      hlcConnection?: any
    }
    tolerations?: any
  }
  fullnameOverride?: any
  nameOverride?: any
  persistence?: {
    accessMode?: any
    annotations?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
  }
  pg?: {
    affinity?: any
    enabled?: any
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
    resources?: any
    service?: {
      port?: any
      type?: any
    }
    tolerations?: any
  }
  rest?: {
    affinity?: any
    config?: {
      apiKey?: any
      composerRestServerCard?: any
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
      path?: any
      tls?: any
    }
    nodeSelector?: any
    resources?: any
    service?: {
      port?: any
      type?: any
    }
    tolerations?: any
  }
}

