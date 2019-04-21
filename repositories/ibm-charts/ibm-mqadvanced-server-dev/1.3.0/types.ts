// Automatically generated

export interface ChartValues {
  arch?: any
  dataPVC?: {
    name?: any
    size?: any
    storageClassName?: any
  }
  image?: {
    pullPolicy?: any
    pullSecret?: any
    repository?: any
    tag?: any
  }
  license?: any
  livenessProbe?: {
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    timeoutSeconds?: any
  }
  log?: {
    format?: any
  }
  nameOverride?: any
  persistence?: {
    enabled?: any
    useDynamicProvisioning?: any
  }
  queueManager?: {
    dev?: {
      adminPassword?: any
      appPassword?: any
    }
    name?: any
  }
  readinessProbe?: {
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    timeoutSeconds?: any
  }
  resources?: {
    limits?: any
    requests?: any
  }
  service?: {
    name?: any
    type?: any
  }
}

