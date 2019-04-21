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
    }
    tag?: any
  }
  integrationServer?: {
    keystore?: {
      keys?: any
      password?: any
    }
    name?: any
    odbcini?: any
    policy?: any
    policyDescriptor?: any
    serverconf?: any
    setdbparms?: any
    truststore?: {
      certs?: any
      password?: any
    }
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
    mqsc?: any
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
    serverlistenerPort?: any
    serverlistenerTLSPort?: any
    type?: any
    webuiPort?: any
  }
}

