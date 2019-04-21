// Automatically generated

export interface ChartValues {
  admin?: {
    http?: {
      containerPort?: any
      servicePort?: any
    }
    https?: {
      containerPort?: any
      servicePort?: any
    }
    loadBalancerIP?: any
    nodePort?: any
    type?: any
  }
  affinity?: any
  cassandra?: {
    enabled?: any
    nameOverride?: any
  }
  env?: any
  image?: {
    pullPolicy?: any
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
  }
  proxy?: {
    http?: {
      containerPort?: any
      servicePort?: any
    }
    https?: {
      containerPort?: any
      servicePort?: any
    }
    loadBalancerIP?: any
    nodePort?: any
    type?: any
  }
  readinessProbe?: any
  replicaCount?: any
  resources?: any
  runMigrations?: any
  tolerations?: any
}

