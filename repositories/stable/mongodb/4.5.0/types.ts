// Automatically generated

export interface ChartValues {
  affinity?: any
  auth?: {
    existingAdminSecret?: any
    existingKeySecret?: any
  }
  clusterDomain?: any
  configmap?: any
  existingSecret?: any
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
  livenessProbe?: {
    enabled?: any
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  mongodbDatabase?: any
  mongodbEnableIPv6?: any
  mongodbExtraFlags?: any
  mongodbPassword?: any
  mongodbRootPassword?: any
  mongodbUsername?: any
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    accessModes?: any
    annotations?: any
    enabled?: any
    existingClaim?: any
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
  replicaSet?: {
    enabled?: any
    key?: any
    name?: any
    pdb?: {
      minAvailable?: {
        arbiter?: any
        primary?: any
        secondary?: any
      }
    }
    replicas?: {
      arbiter?: any
      secondary?: any
    }
    useHostnames?: any
  }
  resources?: any
  securityContext?: {
    enabled?: any
    fsGroup?: any
    runAsUser?: any
  }
  service?: {
    annotations?: any
    nodePort?: any
    port?: any
    type?: any
  }
  tolerations?: any
  usePassword?: any
}

