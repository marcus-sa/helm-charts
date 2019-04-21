// Automatically generated

export interface ChartValues {
  arch?: any
  couchdb?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    persistence?: {
      accessMode?: any
      enabled?: any
      existingClaim?: any
      size?: any
      storageClassName?: any
      useDynamicProvisioning?: any
    }
    resources?: any
  }
  ingress?: {
    enabled?: any
  }
  nameOverride?: any
  transadv?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    resources?: any
    service?: {
      nodePort?: any
    }
  }
  transadvui?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    inmenu?: any
    masternodeurl?: any
    resources?: any
    service?: {
      nodePort?: any
    }
  }
}

