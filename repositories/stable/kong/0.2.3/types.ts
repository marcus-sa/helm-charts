// Automatically generated

export interface ChartValues {
  admin?: {
    annotations?: any
    containerPort?: any
    loadBalancerIP?: any
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
    annotations?: any
    containerPort?: any
    loadBalancerIP?: any
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
}

