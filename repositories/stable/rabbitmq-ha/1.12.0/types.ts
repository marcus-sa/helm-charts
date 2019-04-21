// Automatically generated

export interface ChartValues {
  definitions?: {
    bindings?: any
    exchanges?: any
    parameters?: any
    permissions?: any
    policies?: any
    queues?: any
    users?: any
    vhosts?: any
  }
  existingConfigMap?: any
  existingSecret?: any
  extraConfig?: any
  extraLabels?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    pullSecrets?: any
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
  initContainer?: {
    resources?: any
  }
  livenessProbe?: {
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    timeoutSeconds?: any
  }
  managementPassword?: any
  managementUsername?: any
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
  podAnnotations?: any
  podAntiAffinity?: any
  priorityClassName?: any
  prometheus?: {
    exporter?: {
      capabilities?: any
      enabled?: any
      env?: any
      image?: {
        pullPolicy?: any
        repository?: any
        tag?: any
      }
      port?: any
      resources?: any
    }
    operator?: {
      alerts?: {
        enabled?: any
        labels?: any
        selector?: any
      }
      enabled?: any
      serviceMonitor?: {
        interval?: any
        namespace?: any
        selector?: any
      }
    }
  }
  rabbitmqAmqpsSupport?: {
    amqpsNodePort?: any
    config?: any
    enabled?: any
  }
  rabbitmqAuth?: {
    config?: any
    enabled?: any
  }
  rabbitmqAuthHTTP?: {
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
  rabbitmqMemoryHighWatermarkType?: any
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
    failureThreshold?: any
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

