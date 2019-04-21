// Automatically generated

export interface ChartValues {
  affinity?: any
  annotations?: any
  apiserver?: {
    healthcheck?: {
      enabled?: any
    }
    useKubeapiserverFqdnForAks?: any
  }
  broker?: {
    registry?: any
    repository?: any
    tag?: any
  }
  catalog?: {
    controller?: {
      serviceAccount?: {
        name?: any
        namespace?: any
      }
    }
    names?: any
    path?: any
  }
  cleaner?: {
    registry?: any
    repository?: any
    tag?: any
  }
  criticalAddon?: any
  defaultNamespace?: any
  enableAnalytics?: any
  fullnameOverride?: any
  imagePullPolicy?: any
  imagePullSecrets?: any
  logLevel?: any
  monitoring?: {
    agent?: any
    enabled?: any
    prometheus?: {
      namespace?: any
    }
    serviceMonitor?: {
      labels?: any
    }
  }
  nameOverride?: any
  nodeSelector?: any
  replicaCount?: any
  resources?: any
  serviceAccount?: {
    create?: any
    name?: any
  }
  tolerations?: any
}

