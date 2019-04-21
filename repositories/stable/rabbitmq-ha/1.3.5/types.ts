// Automatically generated

export interface ChartValues {
  customConfigMap?: any
  customSecret?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hostName?: any
    path?: any
    tls?: any
    tlsSecret?: any
  }
  livenessProbe?: {
    failureThreshold?: any
    initialDelaySeconds?: any
    timeoutSeconds?: any
  }
  nameOverride?: any
  nodeSelector?: any
  persistentVolume?: {
    accessModes?: any
    annotations?: any
    enabled?: any
    name?: any
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
    existingSecret?: any
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
  readinessProbe?: {
    initialDelaySeconds?: any
    periodSeconds?: any
    timeoutSeconds?: any
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
  terminationGracePeriodSeconds?: any
  tolerations?: any
  updateStrategy?: any
}

