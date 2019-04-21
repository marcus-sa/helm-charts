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
  appbinding?: {
    create?: any
  }
  attachRequired?: any
  attacher?: {
    name?: any
    pullPolicy?: any
    registry?: any
    repository?: any
    tag?: any
  }
  criticalAddon?: any
  driverName?: any
  enableAnalytics?: any
  fullnameOverride?: any
  imagePullSecrets?: any
  logLevel?: any
  monitoring?: {
    agent?: any
    attacher?: any
    plugin?: any
    prometheus?: {
      namespace?: any
    }
    provisioner?: any
    serviceMonitor?: {
      labels?: any
    }
  }
  nameOverride?: any
  nodeSelector?: any
  plugin?: {
    name?: any
    pullPolicy?: any
    registry?: any
    repository?: any
    tag?: any
  }
  pluginAddress?: any
  pluginDir?: any
  provisioner?: {
    name?: any
    pullPolicy?: any
    registry?: any
    repository?: any
    tag?: any
  }
  rbac?: {
    create?: any
  }
  registrar?: {
    pullPolicy?: any
    registry?: any
    repository?: any
    tag?: any
  }
  replicaCount?: any
  resources?: any
  tolerations?: any
}

