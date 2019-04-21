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
  attacher?: {
    name?: any
    pullPolicy?: any
    registry?: any
    repository?: any
    tag?: any
  }
  clusterRegistrar?: {
    pullPolicy?: any
    registry?: any
    repository?: any
    tag?: any
  }
  controllerPlugin?: {
    name?: any
  }
  criticalAddon?: any
  driverName?: any
  enableAnalytics?: any
  fullnameOverride?: any
  imagePullSecrets?: any
  logLevel?: any
  monitoring?: {
    agent?: any
    controller?: any
    node?: any
    prometheus?: {
      namespace?: any
    }
    serviceMonitor?: {
      labels?: any
    }
  }
  nameOverride?: any
  nodePlugin?: {
    name?: any
  }
  nodeRegistrar?: {
    name?: any
    pullPolicy?: any
    registry?: any
    repository?: any
    tag?: any
  }
  nodeSelector?: any
  plugin?: {
    pullPolicy?: any
    registry?: any
    repository?: any
    tag?: any
  }
  pluginAddress?: any
  pluginDir?: any
  provisioner?: {
    pullPolicy?: any
    registry?: any
    repository?: any
    tag?: any
  }
  rbac?: {
    create?: any
  }
  resources?: any
  tolerations?: any
}

