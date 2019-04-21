// Automatically generated

export interface ChartValues {
  affinity?: any
  annotations?: any
  consulAgent?: {
    gossipKeySecretName?: any
    join?: any
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  imagePullSecret?: any
  ingress?: {
    annotations?: any
    enabled?: any
    hostname?: any
    hosts?: any
    labels?: any
    tls?: any
  }
  labels?: any
  lifecycle?: any
  nameOverride?: any
  podAnnotations?: any
  replicaCount?: any
  resources?: any
  service?: {
    annotations?: any
    clusterIP?: any
    externalPort?: any
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
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
    extraContainers?: any
    extraEnv?: any
    extraVolumes?: any
    logLevel?: any
    readiness?: {
      readyIfSealed?: any
      readyIfStandby?: any
      readyIfUninitialized?: any
    }
  }
}

