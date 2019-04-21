// Automatically generated

export interface ChartValues {
  loki?: {
    affinity?: any
    annotations?: any
    config?: {
      auth_enabled?: any
      ingester?: {
        lifecycler?: {
          ring?: {
            replication_factor?: any
            store?: any
          }
        }
      }
      schema_configs?: any
      storage_config?: any
    }
    deploymentStrategy?: any
    enabled?: any
    fullnameOverride?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    livenessProbe?: any
    minReadySeconds?: any
    nameOverride?: any
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
    port?: any
    priorityClassName?: any
    readinessProbe?: any
    replicas?: any
    resources?: any
    securityContext?: any
    service?: {
      annotations?: any
      labels?: any
      port?: any
    }
    terminationGracePeriodSeconds?: any
    tolerations?: any
  }
  nameOverride?: any
  networkPolicy?: {
    enabled?: any
  }
  promtail?: {
    affinity?: any
    annotations?: any
    config?: any
    deploymentStrategy?: any
    enabled?: any
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
    port?: any
    priorityClassName?: any
    readinessProbe?: any
    resources?: any
    securityContext?: any
    tolerations?: any
    volumeMounts?: any
    volumes?: any
  }
  rbac?: {
    create?: any
    pspEnabled?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
}

