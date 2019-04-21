// Automatically generated

export interface ChartValues {
  busybox?: {
    image?: any
    tag?: any
  }
  configurationFiles?: any
  existingSecret?: any
  extraInitContainers?: any
  extraVolumeMounts?: any
  extraVolumes?: any
  fullnameOverride?: any
  image?: any
  imagePullPolicy?: any
  imagePullSecrets?: any
  imageTag?: any
  initializationFiles?: any
  livenessProbe?: {
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  metrics?: {
    annotations?: any
    enabled?: any
    image?: any
    imagePullPolicy?: any
    imageTag?: any
    livenessProbe?: {
      initialDelaySeconds?: any
      timeoutSeconds?: any
    }
    readinessProbe?: {
      initialDelaySeconds?: any
      timeoutSeconds?: any
    }
    resources?: any
  }
  mysqlAllowEmptyPassword?: any
  mysqlDatabase?: any
  mysqlPassword?: any
  mysqlRootPassword?: any
  mysqlUser?: any
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    accessMode?: any
    annotations?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
    subPath?: any
  }
  podAnnotations?: any
  priorityClassName?: any
  readinessProbe?: {
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  resources?: any
  service?: {
    annotations?: any
    nodePort?: any
    port?: any
    type?: any
  }
  ssl?: {
    certificates?: any
    enabled?: any
    secret?: any
  }
  testFramework?: {
    image?: any
    tag?: any
  }
  timezone?: any
}

