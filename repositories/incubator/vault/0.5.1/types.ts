// Automatically generated

export interface ChartValues {
  affinity?: any
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
  podAnnotations?: any
  replicaCount?: any
  resources?: any
  service?: {
    annotations?: any
    clusterIP?: any
    externalPort?: any
    port?: any
    type?: any
  }
  vault?: {
    config?: {
      listener?: {
        tcp?: {
          tls_disable?: any
        }
      }
    }
    customSecrets?: any
    dev?: any
    readiness?: {
      readyIfSealed?: any
      readyIfStandby?: any
      readyIfUninitialized?: any
    }
  }
}

