// Automatically generated

export interface ChartValues {
  arch?: any
  contentServer?: {
    resources?: {
      limits?: any
      requests?: any
    }
  }
  controlUI?: {
    resources?: {
      limits?: any
      requests?: any
    }
  }
  fsGroupGid?: any
  hostnameIngressEnabled?: any
  image?: {
    configurator?: any
    contentServer?: any
    controlUI?: any
    pullPolicy?: any
    pullSecret?: any
    tag?: any
  }
  log?: {
    format?: any
  }
  persistence?: {
    enabled?: any
    existingClaimName?: any
    size?: any
    storageClassName?: any
    useDynamicProvisioning?: any
  }
  replicaCount?: any
  ssoEnabled?: any
  tls?: {
    generate?: any
    hostname?: any
    secret?: any
  }
}

