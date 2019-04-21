// Automatically generated

export interface ChartValues {
  affinity?: any
  annotations?: any
  config?: {
    datasource?: {
      database?: any
      host?: any
      password?: any
      passwordSecret?: {
        key?: any
        name?: any
      }
      port?: any
      sslmode?: any
      user?: any
    }
    disableDefaultMetrics?: any
    queries?: any
  }
  extraContainers?: any
  extraVolumes?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  nameOverride?: any
  nodeSelector?: any
  podLabels?: any
  rbac?: {
    create?: any
    pspEnabled?: any
  }
  replicaCount?: any
  resources?: any
  service?: {
    annotations?: any
    labels?: any
    name?: any
    port?: any
    targetPort?: any
    type?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  tolerations?: any
}

