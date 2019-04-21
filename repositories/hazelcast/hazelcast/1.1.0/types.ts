// Automatically generated

export interface ChartValues {
  cluster?: {
    memberCount?: any
  }
  fullnameOverride?: any
  gracefulShutdown?: {
    enabled?: any
    maxWaitSeconds?: any
  }
  hazelcast?: {
    configurationFiles?: any
    javaOpts?: any
    rest?: any
  }
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    repository?: any
    tag?: any
  }
  livenessProbe?: {
    enabled?: any
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  mancenter?: {
    enabled?: any
    image?: {
      pullPolicy?: any
      pullSecrets?: any
      repository?: any
      tag?: any
    }
    javaOpts?: any
    licenseKey?: any
    licenseKeySecretName?: any
    livenessProbe?: {
      enabled?: any
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    nodeSelector?: any
    persistence?: {
      accessModes?: any
      enabled?: any
      existingClaim?: any
      size?: any
      storageClass?: any
    }
    readinessProbe?: {
      enabled?: any
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    resources?: any
    service?: {
      clusterIP?: any
      port?: any
      type?: any
    }
  }
  nameOverride?: any
  nodeSelector?: any
  rbac?: {
    create?: any
  }
  readinessProbe?: {
    enabled?: any
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  resources?: any
  service?: {
    clusterIP?: any
    port?: any
    type?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
}

