// Automatically generated

export interface ChartValues {
  dataPVC?: {
    name?: any
    size?: any
    storageClassName?: any
  }
  helmTestOverride?: any
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
  metrics?: {
    enabled?: any
  }
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
  security?: {
    context?: {
      fsGroup?: any
      supplementalGroups?: any
    }
    initVolumeAsRoot?: any
    serviceAccountName?: any
  }
  service?: {
    type?: any
  }
}

