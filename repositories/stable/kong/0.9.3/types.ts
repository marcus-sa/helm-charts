// Automatically generated

export interface ChartValues {
  admin?: {
    annotations?: any
    containerPort?: any
    hostPort?: any
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
  ingressController?: {
    enabled?: any
    image?: {
      repository?: any
      tag?: any
    }
    ingressClass?: any
    installCRDs?: any
    rbac?: {
      create?: any
    }
    replicaCount?: any
    resources?: any
    serviceAccount?: {
      create?: any
      name?: any
    }
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
    http?: {
      containerPort?: any
      enabled?: any
      hostPort?: any
      nodePort?: any
      servicePort?: any
    }
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      path?: any
      tls?: any
    }
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
    tls?: {
      containerPort?: any
      enabled?: any
      hostPort?: any
      nodePort?: any
      servicePort?: any
    }
    type?: any
  }
  readinessProbe?: any
  replicaCount?: any
  resources?: any
  runMigrations?: any
  serviceAccount?: {
    name?: any
  }
  tolerations?: any
  waitImage?: {
    repository?: any
    tag?: any
  }
}

