// Automatically generated

export interface ChartValues {
  application?: {
    database_url?: any
    initializeCommand?: any
    migrateCommand?: any
    secretChecksum?: any
    secretName?: any
    tier?: any
    track?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    secrets?: any
    tag?: any
  }
  livenessProbe?: {
    initialDelaySeconds?: any
    path?: any
    timeoutSeconds?: any
  }
  nameOverride?: any
  podDisruptionBudget?: {
    enabled?: any
    maxUnavailable?: any
    minAvailable?: any
  }
  readinessProbe?: {
    initialDelaySeconds?: any
    path?: any
    timeoutSeconds?: any
  }
  releaseOverride?: any
  replicaCount?: any
  resources?: any
  service?: {
    additionalHosts?: any
    commonName?: any
    enabled?: any
    externalPort?: any
    internalPort?: any
    name?: any
    type?: any
    url?: any
  }
}

