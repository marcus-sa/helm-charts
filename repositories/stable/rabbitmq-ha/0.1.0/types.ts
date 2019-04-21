// Automatically generated

export interface ChartValues {
  customConfigMap?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  nameOverride?: any
  nodeSelector?: any
  persistentVolume?: {
    accessModes?: any
    annotations?: any
    enabled?: any
    size?: any
    storageClass?: any
  }
  podAntiAffinity?: any
  rabbitmqEpmdPort?: any
  rabbitmqErlangCookie?: any
  rabbitmqHipeCompile?: any
  rabbitmqManagerPort?: any
  rabbitmqMemoryHighWatermark?: any
  rabbitmqNodePort?: any
  rabbitmqPassword?: any
  rabbitmqUsername?: any
  rabbitmqVhost?: any
  rbac?: {
    create?: any
    serviceAccountName?: any
  }
  replicaCount?: any
  resources?: any
  service?: {
    annotations?: any
    clusterIP?: any
    externalIPs?: any
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
    type?: any
  }
  tolerations?: any
  updateStrategy?: any
}

