// Automatically generated

export interface ChartValues {
  affinity?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    repository?: any
    tag?: any
  }
  logLevel?: any
  metricsRelistInterval?: any
  nameOverride?: any
  nodeSelector?: any
  prometheus?: {
    port?: any
    url?: any
  }
  rbac?: {
    create?: any
  }
  replicas?: any
  resources?: any
  rules?: {
    custom?: any
    default?: any
    existing?: any
  }
  service?: {
    annotations?: any
    port?: any
    type?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  tls?: {
    ca?: any
    certificate?: any
    enable?: any
    key?: any
  }
  tolerations?: any
}

