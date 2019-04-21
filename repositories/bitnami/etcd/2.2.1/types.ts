// Automatically generated

export interface ChartValues {
  affinity?: any
  allowNoneAuthentication?: any
  auth?: {
    client?: {
      enableAuthentication?: any
      existingSecret?: any
      secureTransport?: any
      useAutoTLS?: any
    }
    peer?: {
      enableAuthentication?: any
      existingSecret?: any
      secureTransport?: any
      useAutoTLS?: any
    }
    rbac?: {
      enabled?: any
      existingSecret?: any
      rootPassword?: any
    }
  }
  configFileConfigMap?: any
  envVarsConfigMap?: any
  global?: {
    imagePullSecrets?: any
    imageRegistry?: any
  }
  image?: {
    debug?: any
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
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
  metrics?: {
    enabled?: any
    podAnnotations?: any
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
  podAnnotations?: any
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
    annotations?: any
    dnsBase?: any
    loadBalancerIP?: any
    nodePort?: any
    peerNodePort?: any
    peerPort?: any
    port?: any
    type?: any
  }
  statefulset?: {
    podManagementPolicy?: any
    replicaCount?: any
    rollingUpdatePartition?: any
    updateStratey?: any
  }
  tolerations?: any
}

