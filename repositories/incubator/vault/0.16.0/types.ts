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
  nodeSelector?: any
  podAnnotations?: any
  replicaCount?: any
  resources?: any
  service?: {
    annotations?: any
    clusterExternalPort?: any
    clusterIP?: any
    clusterPort?: any
    externalPort?: any
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
    port?: any
    type?: any
  }
  tolerations?: any
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
    existingConfigName?: any
    extraContainers?: any
    extraEnv?: any
    extraInitContainers?: any
    extraVolumes?: any
    liveness?: {
      aliveIfUninitialized?: any
      initialDelaySeconds?: any
      periodSeconds?: any
    }
    logLevel?: any
    readiness?: {
      initialDelaySeconds?: any
      periodSeconds?: any
      readyIfSealed?: any
      readyIfStandby?: any
      readyIfUninitialized?: any
    }
  }
}

