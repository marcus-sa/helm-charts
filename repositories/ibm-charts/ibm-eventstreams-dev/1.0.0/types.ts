// Automatically generated

export interface ChartValues {
  global?: {
    fsGroupGid?: any
    image?: {
      imageTags?: {
        accessControllerTag?: any
        alpineTag?: any
        certGenTag?: any
        elasticSearchTag?: any
        healthcheckTag?: any
        indexmgrTag?: any
        kafkaMetricsProxyTag?: any
        kafkaProxyTag?: any
        kafkaTag?: any
        kubectlTag?: any
        metricsReporterTag?: any
        redisTag?: any
        roleMappingsTag?: any
        telemetryTag?: any
      }
      pullPolicy?: any
      pullSecret?: any
      repository?: any
    }
  }
  kafka?: {
    brokerLoggingLevel?: any
    brokers?: any
    configMapName?: any
    heapOpts?: any
    interBrokerProtocolVersion?: any
    jvmHeapSize?: any
    logMessageFormatVersion?: any
    metricsReporterJvmHeapSize?: any
    metricsReporterResources?: {
      limits?: any
      requests?: any
    }
    resources?: {
      limits?: any
      requests?: any
    }
  }
  license?: any
  messageIndexing?: {
    messageIndexingEnabled?: any
    resources?: {
      limits?: {
        memory?: any
      }
    }
  }
  persistence?: {
    dataPVC?: {
      name?: any
      size?: any
      storageClassName?: any
    }
    enabled?: any
    useDynamicProvisioning?: any
  }
  proxy?: {
    externalEndpoint?: any
  }
  telemetry?: {
    enabled?: any
  }
  tls?: {
    cacert?: any
    cert?: any
    key?: any
    type?: any
  }
  zookeeper?: {
    persistence?: {
      enabled?: any
    }
  }
}

