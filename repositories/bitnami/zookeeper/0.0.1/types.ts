// Automatically generated

export interface ChartValues {
  Resources?: any
  allowAnonymousLogin?: any
  auth?: {
    clientPassword?: any
    clientUser?: any
    enabled?: any
    existingSecret?: any
    serverPasswords?: any
    serverUsers?: any
  }
  config?: any
  heapSize?: any
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
    repository?: any
    tag?: any
  }
  initLimit?: any
  jvmFlags?: any
  livenessProbe?: {
    enabled?: any
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  maxClientCnxns?: any
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    accessModes?: any
    annotations?: any
    enabled?: any
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
  securityContext?: {
    enabled?: any
    fsGroup?: any
    runAsUser?: any
  }
  serverID?: any
  servers?: any
  service?: {
    port?: any
    type?: any
  }
  syncLimit?: any
  tickTime?: any
  tolerations?: any
  updateStrategy?: any
}

