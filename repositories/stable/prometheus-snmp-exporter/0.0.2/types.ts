// Automatically generated

export interface ChartValues {
  affinity?: any
  conf?: {
    params?: {
      conf?: any
    }
  }
  config?: any
  configmapReload?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    resources?: any
  }
  extraArgs?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    tls?: any
  }
  nameOverride?: any
  nodeSelector?: any
  podAnnotations?: any
  rbac?: {
    create?: any
  }
  replicas?: any
  resources?: any
  restartPolicy?: any
  service?: {
    annotations?: any
    externalIPs?: any
    labels?: any
    port?: any
    type?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  serviceMonitor?: {
    enabled?: any
    honorLabels?: any
    interval?: any
    namespace?: any
    params?: {
      enabled?: any
    }
    path?: any
    scrapeTimeout?: any
    selector?: any
  }
  tolerations?: any
}

