// Automatically generated

export interface ChartValues {
  affinity?: any
  cluster?: {
    clientEncryption?: any
    datacenter?: any
    enableRPC?: any
    endpointSnitch?: any
    internodeEncryption?: any
    minimumAvailable?: any
    name?: any
    numTokens?: any
    rack?: any
    replicaCount?: any
    seedCount?: any
  }
  dbUser?: {
    existingSecret?: any
    forcePassword?: any
    password?: any
    user?: any
  }
  existingConfiguration?: any
  fullnameOverride?: any
  global?: {
    imageRegistry?: any
  }
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
    repository?: any
    tag?: any
  }
  initDBConfigMap?: any
  jvm?: {
    extraOpts?: any
    maxHeapSize?: any
    newHeapSize?: any
  }
  livenessProbe?: {
    enabled?: any
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  metrics?: {
    enabled?: any
    image?: {
      pullPolicy?: any
      pullSecrets?: any
      registry?: any
      repository?: any
      tag?: any
    }
    podAnnotations?: any
  }
  minAvailable?: any
  nameOverride?: any
  networkPolicy?: {
    allowExternal?: any
    enabled?: any
  }
  persistence?: {
    accessModes?: any
    annotations?: any
    enabled?: any
    size?: any
    storageClass?: any
  }
  podAnnotations?: any
  podLabels?: any
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
  selector?: any
  service?: {
    loadBalancerIP?: any
    nodePort?: any
    port?: any
    thriftPort?: any
    type?: any
  }
  statefulset?: {
    rollingUpdatePartition?: any
    updateStrategy?: any
  }
  tlsEncryptionSecretName?: any
  tolerations?: any
}

