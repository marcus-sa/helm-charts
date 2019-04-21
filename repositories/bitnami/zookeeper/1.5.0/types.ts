// Automatically generated

export interface ChartValues {
  affinity?: any
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
  global?: {
    imagePullSecrets?: any
    imageRegistry?: any
  }
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
  metrics?: {
    enabled?: any
    image?: {
      pullSecrets?: any
      registry?: any
      repository?: any
      tag?: any
    }
    podAnnotations?: any
    resources?: any
  }
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    accessModes?: any
    annotations?: any
    enabled?: any
    size?: any
    storageClass?: any
  }
  podManagementPolicy?: any
  readinessProbe?: {
    enabled?: any
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  replicaCount?: any
  resources?: any
  rollingUpdatePartition?: any
  securityContext?: {
    enabled?: any
    fsGroup?: any
    runAsUser?: any
  }
  service?: {
    electionPort?: any
    followerPort?: any
    port?: any
    type?: any
  }
  syncLimit?: any
  tickTime?: any
  tolerations?: any
  updateStrategy?: any
}

