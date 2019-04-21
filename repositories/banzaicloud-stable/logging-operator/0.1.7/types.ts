// Automatically generated

export interface ChartValues {
  affinity?: any
  fluentbit?: {
    enabled?: any
    image?: any
    namespace?: any
  }
  fluentd?: {
    configReloaderImage?: any
    enabled?: any
    fluentdPvcSpec?: any
    image?: any
    namespace?: any
    volumeModImage?: any
  }
  fullnameOverride?: any
  grafana?: {
    dashboard?: {
      enabled?: any
    }
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  nameOverride?: any
  nodeSelector?: any
  rbac?: {
    enabled?: any
  }
  replicaCount?: any
  resources?: any
  securityContext?: any
  tls?: {
    enabled?: any
    secretName?: any
    sharedKey?: any
  }
  tolerations?: any
  watchNamespace?: any
}

