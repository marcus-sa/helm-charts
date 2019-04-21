// Automatically generated

export interface ChartValues {
  admin?: {
    annotations?: any
    containerPort?: any
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      path?: any
      tls?: any
    }
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
    nodePort?: any
    servicePort?: any
    type?: any
    useTLS?: any
  }
  affinity?: any
  cassandra?: {
    enabled?: any
    nameOverride?: any
  }
  env?: any
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    repository?: any
    tag?: any
  }
  livenessProbe?: any
  nameOverride?: any
  nodeSelector?: any
  podAnnotations?: any
  postgresql?: {
    enabled?: any
    nameOverride?: any
    service?: {
      port?: any
    }
  }
  proxy?: {
    annotations?: any
    containerPort?: any
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      path?: any
      tls?: any
    }
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
    nodePort?: any
    servicePort?: any
    type?: any
    useTLS?: any
  }
  readinessProbe?: any
  replicaCount?: any
  resources?: any
  runMigrations?: any
  tolerations?: any
  waitImage?: {
    repository?: any
    tag?: any
  }
}

