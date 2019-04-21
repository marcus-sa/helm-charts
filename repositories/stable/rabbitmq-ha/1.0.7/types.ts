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
  rabbitmqAmqpsSupport?: {
    amqpsNodePort?: any
    config?: any
    enabled?: any
  }
  rabbitmqAuth?: {
    config?: any
    enabled?: any
  }
  rabbitmqCert?: {
    cacertfile?: any
    certfile?: any
    enabled?: any
    keyfile?: any
  }
  rabbitmqEpmdPort?: any
  rabbitmqErlangCookie?: any
  rabbitmqHipeCompile?: any
  rabbitmqLDAPPlugin?: {
    config?: any
    enabled?: any
  }
  rabbitmqMQTTPlugin?: {
    config?: any
    enabled?: any
  }
  rabbitmqManagerPort?: any
  rabbitmqMemoryHighWatermark?: any
  rabbitmqNodePort?: any
  rabbitmqPassword?: any
  rabbitmqSTOMPPlugin?: {
    config?: any
    enabled?: any
  }
  rabbitmqUsername?: any
  rabbitmqVhost?: any
  rabbitmqWebMQTTPlugin?: {
    config?: any
    enabled?: any
  }
  rabbitmqWebSTOMPPlugin?: {
    config?: any
    enabled?: any
  }
  rbac?: {
    create?: any
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
  serviceAccount?: {
    create?: any
    name?: any
  }
  tolerations?: any
  updateStrategy?: any
}

