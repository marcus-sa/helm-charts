// Automatically generated

export interface ChartValues {
  databaseType?: {
    postgresql?: any
  }
  extraVars?: any
  global?: {
    imageRegistry?: any
  }
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    enabled?: any
    hosts?: any
  }
  nameOverride?: any
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

