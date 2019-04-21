// Automatically generated

export interface ChartValues {
  debug?: any
  etcdImage?: {
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
  keeper?: {
    affinity?: any
    annotations?: any
    nodeSelector?: any
    replicaCount?: any
    resources?: any
    service?: {
      annotations?: any
      ports?: any
    }
    tolerations?: any
  }
  nameOverride?: any
  persistence?: {
    accessModes?: any
    enabled?: any
    size?: any
    storageClassName?: any
  }
  pgParameters?: any
  ports?: {
    stolon?: {
      containerPort?: any
    }
  }
  proxy?: {
    affinity?: any
    annotations?: any
    listenAddress?: any
    nodeSelector?: any
    replicaCount?: any
    resources?: any
    service?: {
      annotations?: any
      clusterIP?: any
      loadBalancerIP?: any
      ports?: any
      type?: any
    }
    tolerations?: any
  }
  rbac?: {
    create?: any
  }
  replicationPassword?: any
  replicationUsername?: any
  sentinel?: {
    affinity?: any
    nodeSelector?: any
    replicaCount?: any
    resources?: any
    tolerations?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  store?: {
    backend?: any
    endpoints?: any
    kubeResourceKind?: any
  }
  superuserPassword?: any
  superuserUsername?: any
}

