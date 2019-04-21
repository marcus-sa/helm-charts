// Automatically generated

export interface ChartValues {
  auth?: {
    existingAdminSecret?: any
    existingKeySecret?: any
  }
  configmap?: any
  existingSecret?: any
  fullnameOverride?: any
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
  mongodbExtraFlags?: any
  mongodbPassword?: any
  mongodbRootPassword?: any
  mongodbUsername?: any
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    accessMode?: any
    accessModes?: any
    annotations?: any
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
  }
  resources?: any
  securityContext?: {
    enabled?: any
    fsGroup?: any
    runAsUser?: any
  }
  service?: {
    nodePort?: any
    port?: any
    type?: any
  }
  usePassword?: any
}

