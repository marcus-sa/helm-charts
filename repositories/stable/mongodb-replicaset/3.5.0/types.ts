// Automatically generated

export interface ChartValues {
  affinity?: any
  auth?: {
    adminPassword?: any
    adminUser?: any
    enabled?: any
    existingAdminSecret?: any
    existingKeySecret?: any
    key?: any
  }
  configmap?: any
  extraLabels?: any
  extraVars?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  installImage?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
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
    resources?: any
  }
  nameOverride?: any
  nodeSelector?: any
  persistentVolume?: {
    accessModes?: any
    annotations?: any
    enabled?: any
    size?: any
    storageClass?: any
  }
  podAnnotations?: any
  podDisruptionBudget?: any
  port?: any
  readinessProbe?: {
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  replicaSetName?: any
  replicas?: any
  resources?: any
  securityContext?: any
  serviceAnnotations?: any
  tls?: {
    cacert?: any
    cakey?: any
    enabled?: any
  }
  tolerations?: any
}

