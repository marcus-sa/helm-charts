// Automatically generated

export interface ChartValues {
  advertisedListeners?: any
  allowPlaintextListener?: any
  auth?: {
    brokerPassword?: any
    brokerUser?: any
    certificatesPassword?: any
    certificatesSecret?: any
    enabled?: any
    existingSecret?: any
    interBrokerPassword?: any
    interBrokerUser?: any
    zookeeperPassword?: any
    zookeeperUser?: any
  }
  brokerId?: any
  config?: any
  defaultReplicationFactor?: any
  deleteTopicEnable?: any
  externalZookeeper?: {
    servers?: any
  }
  fullnameOverride?: any
  global?: {
    imagePullSecrets?: any
    imageRegistry?: any
  }
  heapOpts?: any
  image?: {
    debug?: any
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
    repository?: any
    tag?: any
  }
  kafkaPassword?: any
  listeners?: any
  livenessProbe?: {
    enabled?: any
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  logFlushIntervalMessages?: any
  logFlushIntervalMs?: any
  logMessageFormatVersion?: any
  logRetentionBytes?: any
  logRetentionCheckIntervalMs?: any
  logRetentionHours?: any
  logSegmentBytes?: any
  logsDirs?: any
  maxMessageBytes?: any
  metrics?: {
    jmx?: {
      configMap?: {
        enabled?: any
        overrideConfig?: any
        overrideName?: any
      }
      enabled?: any
      exporterPort?: any
      image?: {
        pullPolicy?: any
        pullSecrets?: any
        registry?: any
        repository?: any
        tag?: any
      }
      jmxPort?: any
      resources?: any
      whitelistObjectNames?: any
    }
    kafka?: {
      enabled?: any
      image?: {
        pullSecrets?: any
        registry?: any
        repository?: any
        tag?: any
      }
      port?: any
      resources?: any
    }
  }
  nameOverride?: any
  nodeSelector?: any
  numIoThreads?: any
  numNetworkThreads?: any
  numPartitions?: any
  numRecoveryThreadsPerDataDir?: any
  persistence?: {
    accessModes?: any
    annotations?: any
    enabled?: any
    size?: any
    storageClass?: any
  }
  readinessProbe?: {
    enabled?: any
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  replicaCount?: any
  resources?: any
  rollingUpdatePartition?: any
  securityContext?: {
    enabled?: any
    fsGroup?: any
    runAsUser?: any
  }
  service?: {
    annotations?: any
    port?: any
    type?: any
  }
  socketReceiveBufferBytes?: any
  socketRequestMaxBytes?: any
  socketSendBufferBytes?: any
  tolerations?: any
  updateStrategy?: any
  zookeeper?: {
    enabled?: any
    nameOverride?: any
  }
  zookeeperConnectionTimeoutMs?: any
}

