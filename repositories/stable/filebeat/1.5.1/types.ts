// Automatically generated

export interface ChartValues {
  affinity?: any
  annotations?: any
  args?: any
  command?: any
  config?: any
  extraInitContainers?: any
  extraVars?: any
  extraVolumeMounts?: any
  extraVolumes?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    repository?: any
    tag?: any
  }
  indexTemplateLoad?: any
  monitoring?: {
    args?: any
    enabled?: any
    exporterPort?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    resources?: any
    serviceMonitor?: {
      enabled?: any
      interval?: any
      labels?: any
      namespace?: any
      telemetryPath?: any
    }
    targetPort?: any
    telemetryPath?: any
  }
  nameOverride?: any
  nodeSelector?: any
  plugins?: any
  podSecurityPolicy?: {
    annotations?: any
    enabled?: any
  }
  priorityClassName?: any
  privileged?: any
  rbac?: {
    create?: any
  }
  resources?: any
  serviceAccount?: {
    create?: any
    name?: any
  }
  tolerations?: any
}

