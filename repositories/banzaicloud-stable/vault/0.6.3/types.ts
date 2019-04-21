// Automatically generated

export interface ChartValues {
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hostname?: any
    hosts?: any
    tls?: any
  }
  nameOverride?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    hostPath?: any
    size?: any
    storageClass?: any
  }
  podAnnotations?: any
  replicaCount?: any
  resources?: any
  service?: {
    annotations?: any
    name?: any
    port?: any
    type?: any
  }
  statsd?: {
    config?: any
    metrics?: {
      port?: any
    }
  }
  strategy?: {
    type?: any
  }
  unsealer?: {
    args?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    metrics?: {
      enabled?: any
      name?: any
      port?: any
      serviceMonitor?: {
        additionalLabels?: any
        enabled?: any
        relabellings?: any
      }
    }
  }
  vault?: {
    config?: {
      listener?: {
        tcp?: {
          tls_disable?: any
        }
      }
      storage?: any
    }
    customSecrets?: any
    defaultStorage?: any
    envSecrets?: any
    externalConfig?: any
    logLevel?: any
  }
}

