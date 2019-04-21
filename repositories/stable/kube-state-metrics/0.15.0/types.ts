// Automatically generated

export interface ChartValues {
  collectors?: {
    configmaps?: any
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
    poddisruptionbudgets?: any
    pods?: any
    replicasets?: any
    replicationcontrollers?: any
    resourcequotas?: any
    secrets?: any
    services?: any
    statefulsets?: any
  }
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  nameOverride?: any
  namespace?: any
  nodeSelector?: any
  podAnnotations?: any
  podSecurityPolicy?: {
    annotations?: any
    enabled?: any
  }
  priorityClassName?: any
  prometheusScrape?: any
  rbac?: {
    create?: any
  }
  resources?: any
  securityContext?: {
    enabled?: any
    fsGroup?: any
    runAsUser?: any
  }
  service?: {
    loadBalancerIP?: any
    nodePort?: any
    port?: any
    type?: any
  }
  serviceAccount?: {
    create?: any
    imagePullSecrets?: any
    name?: any
  }
  tolerations?: any
}

