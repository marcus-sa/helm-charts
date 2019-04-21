// Automatically generated

export interface ChartValues {
  affinity?: any
  annotations?: any
  config?: {
    server?: {
      http_listen_port?: any
    }
  }
  deploymentStrategy?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  livenessProbe?: any
  minReadySeconds?: any
  nameOverride?: any
  networkPolicy?: {
    enabled?: any
  }
  nodeSelector?: any
  persistence?: {
    accessModes?: any
    annotations?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClassName?: any
    subPath?: any
  }
  podAnnotations?: any
  priorityClassName?: any
  rbac?: {
    create?: any
    pspEnabled?: any
  }
  readinessProbe?: any
  replicas?: any
  resources?: any
  securityContext?: any
  service?: {
    annotations?: any
    clusterIP?: any
    labels?: any
    nodePort?: any
    port?: any
    type?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  terminationGracePeriodSeconds?: any
  tolerations?: any
}

