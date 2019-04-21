// Automatically generated

export interface ChartValues {
  collectors?: {
    cronjobs?: any
    daemonsets?: any
    deployments?: any
    endpoints?: any
    horizontalpodautoscalers?: any
    jobs?: any
    limitranges?: any
    namespaces?: any
    nodes?: any
    persistentvolumeclaims?: any
    persistentvolumes?: any
    pods?: any
    replicasets?: any
    replicationcontrollers?: any
    resourcequotas?: any
    services?: any
    statefulsets?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  nameOverride?: any
  namespace?: any
  nodeSelector?: any
  podAnnotations?: any
  prometheusScrape?: any
  rbac?: {
    create?: any
    serviceAccountName?: any
  }
  resources?: any
  service?: {
    loadBalancerIP?: any
    nodePort?: any
    port?: any
    type?: any
  }
  tolerations?: any
}

