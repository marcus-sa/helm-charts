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
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    repository?: any
    tag?: any
  }
  jet?: {
    configurationFiles?: any
    javaOpts?: any
    rest?: any
  }
  livenessProbe?: {
    enabled?: any
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  managementcenter?: {
    configurationFiles?: any
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
  securityContext?: {
    enabled?: any
    fsGroup?: any
    runAsUser?: any
  }
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

