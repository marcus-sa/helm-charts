// Automatically generated

export interface ChartValues {
  affinity?: any
  args?: any
  command?: any
  env?: any
  files?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  livenessProbe?: any
  nameOverride?: any
  nodeSelector?: any
  podAnnotations?: any
  podDisruptionBudget?: any
  podLabels?: any
  ports?: {
    admin?: {
      containerPort?: any
    }
  }
  priorityClassName?: any
  readinessProbe?: any
  replicaCount?: any
  resources?: any
  secretMounts?: any
  securityContext?: any
  service?: {
    annotations?: any
    enabled?: any
    name?: any
    ports?: any
    type?: any
  }
  serviceMonitor?: {
    additionalLabels?: any
    enabled?: any
    interval?: any
    namespace?: any
  }
  strategy?: any
  templates?: any
  terminationGracePeriodSeconds?: any
  tolerations?: any
}

