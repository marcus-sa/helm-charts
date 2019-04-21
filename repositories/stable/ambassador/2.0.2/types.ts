// Automatically generated

export interface ChartValues {
  adminService?: {
    create?: any
    nodePort?: any
    port?: any
    type?: any
  }
  affinity?: any
  ambassadorConfig?: any
  daemonSet?: any
  env?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  imagePullSecrets?: any
  nameOverride?: any
  namespace?: {
    name?: any
  }
  nodeSelector?: any
  podAnnotations?: any
  prometheusExporter?: {
    configuration?: any
    enabled?: any
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  rbac?: {
    create?: any
    namespaced?: any
  }
  replicaCount?: any
  resources?: any
  securityContext?: any
  service?: {
    annotations?: any
    externalTrafficPolicy?: any
    http?: {
      enabled?: any
      nodePort?: any
      port?: any
      targetPort?: any
    }
    https?: {
      enabled?: any
      nodePort?: any
      port?: any
      targetPort?: any
    }
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
    port?: any
    type?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  tolerations?: any
  volumeMounts?: any
  volumes?: any
}

