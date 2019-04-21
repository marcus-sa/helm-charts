// Automatically generated

export interface ChartValues {
  affinity?: any
  databaseType?: {
    mariadb?: any
    postgresql?: any
  }
  externalDatabase?: {
    host?: any
    password?: any
    port?: any
    user?: any
  }
  extraVars?: any
  global?: {
    imagePullSecrets?: any
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
  mariadb?: {
    enabled?: any
  }
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
  }
  podAnnotations?: any
  podDisruptionBudget?: {
    enabled?: any
    maxUnavailable?: any
    minAvailable?: any
  }
  postgresql?: {
    enabled?: any
  }
  redmineEmail?: any
  redmineLanguage?: any
  redminePassword?: any
  redmineUsername?: any
  replicas?: any
  resources?: any
  service?: {
    externalTrafficPolicy?: any
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
    nodePorts?: {
      http?: any
    }
    port?: any
    type?: any
  }
  smtpHost?: any
  smtpPassword?: any
  smtpPort?: any
  smtpTls?: any
  smtpUser?: any
  tolerations?: any
}

