// Automatically generated

export interface ChartValues {
  databaseType?: {
    postgresql?: any
  }
  extraVars?: any
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hostname?: any
    tls?: any
  }
  nameOverride?: any
  networkPolicyApiVersion?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
  }
  podDisruptionBudget?: {
    enabled?: any
    maxUnavailable?: any
    minAvailable?: any
  }
  redmineEmail?: any
  redmineLanguage?: any
  redminePassword?: any
  redmineUsername?: any
  replicas?: any
  resources?: any
  serviceLoadBalancerSourceRanges?: any
  serviceType?: any
  smtpHost?: any
  smtpPassword?: any
  smtpPort?: any
  smtpTls?: any
  smtpUser?: any
}

