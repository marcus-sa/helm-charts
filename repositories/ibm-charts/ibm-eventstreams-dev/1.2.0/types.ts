// Automatically generated

export interface ChartValues {
  checkSupportedPlatform?: any
  externalMonitoring?: {
    datadog?: any
  }
  global?: {
    arch?: any
    fsGroupGid?: any
    image?: {
      imageTags?: {
        accessControllerTag?: any
        baseTag?: any
        certGenTag?: any
        codegenTag?: any
        collectorTag?: any
        databaseTag?: any
        elasticSearchTag?: any
        healthcheckTag?: any
        indexmgrTag?: any
        initTag?: any
        kafkaMetricsProxyTag?: any
        kafkaProxyTag?: any
        kafkaTag?: any
        kubectlTag?: any
        metricsReporterTag?: any
        oauthTag?: any
        restTag?: any
        roleMappingsTag?: any
        telemetryTag?: any
        uiTag?: any
      }
      pullPolicy?: any
      pullSecret?: any
      repository?: any
    }
  }
  kafka?: {
    brokers?: any
    configMapName?: any
    heapOpts?: any
    metricsReporterResources?: {
      limits?: any
      requests?: any
    }
    openJMX?: any
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

