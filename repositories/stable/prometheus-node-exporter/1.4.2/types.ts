// Automatically generated

export interface ChartValues {
  affinity?: any
  endpoints?: any
  extraArgs?: any
  extraHostVolumeMounts?: any
  fullnameOverride?: any
  hostNetwork?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  nameOverride?: any
  nodeSelector?: any
  podLabels?: any
  priorityClassName?: any
  prometheus?: {
    monitor?: {
      additionalLabels?: any
      enabled?: any
    }
  }
  rbac?: {
    create?: any
    pspEnabled?: any
  }
  resources?: any
  securityContext?: any
  service?: {
    annotations?: any
    nodePort?: any
    port?: any
    targetPort?: any
    type?: any
  }
  serviceAccount?: {
    create?: any
    imagePullSecrets?: any
    name?: any
  }
  tolerations?: any
}

