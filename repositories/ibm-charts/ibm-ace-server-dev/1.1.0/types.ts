// Automatically generated

export interface ChartValues {
  acemq?: {
    resources?: {
      limits?: any
      requests?: any
    }
  }
  aceonly?: {
    resources?: {
      limits?: any
      requests?: any
    }
  }
  arch?: any
  configurationSecret?: any
  contentServerURL?: any
  dataPVC?: {
    name?: any
    size?: any
    storageClassName?: any
  }
  fsGroupGid?: any
  image?: {
    pullPolicy?: any
    pullSecret?: any
    repository?: {
      acemq?: any
      aceonly?: any
      configurator?: any
    }
    tag?: any
  }
  integrationServer?: {
    keystoreKeyNames?: any
    name?: any
    truststoreCertNames?: any
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
    name?: any
  }
  queueManagerEnabled?: any
  readinessProbe?: {
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    timeoutSeconds?: any
  }
  replicaCount?: any
  service?: {
    iP?: any
    serverlistenerPort?: any
    serverlistenerTLSPort?: any
    type?: any
    webuiPort?: any
  }
}

