// Automatically generated

export interface ChartValues {
  anchoreAnalyzer?: {
    affinity?: any
    annotations?: any
    concurrentTasksPerWorker?: any
    containerPort?: any
    cycleTimers?: any
    nodeSelector?: any
    replicaCount?: any
    resources?: any
    scratchVolume?: {
      details?: any
      mountPath?: any
    }
    tolerations?: any
  }
  anchoreApi?: {
    affinity?: any
    annotations?: any
    ingress?: {
      enabled?: any
      hosts?: any
      path?: any
    }
    nodeSelector?: any
    replicaCount?: any
    resources?: any
    service?: {
      annotations?: any
      port?: any
      type?: any
    }
    tolerations?: any
  }
  anchoreCatalog?: {
    affinity?: any
    annotations?: any
    archive?: any
    cycleTimers?: any
    events?: any
    nodeSelector?: any
    replicaCount?: any
    resources?: any
    service?: {
      annotations?: any
      port?: any
      type?: any
    }
    tolerations?: any
  }
  anchoreEnterpriseFeeds?: {
    affinity?: any
    alpineDriverEnabled?: any
    annotations?: any
    apiOnly?: any
    centosDriverEnabled?: any
    cycleTimers?: any
    dbConfig?: {
      connectionPoolSize?: any
      ssl?: any
      timeout?: any
    }
    debianDriverEnabled?: any
    enabled?: any
    gemDbEndpoint?: any
    gemDriverEnabled?: any
    nodeSelector?: any
    npmDriverEnabled?: any
    olDriverEnabled?: any
    resources?: any
    scratchVolume?: {
      details?: any
      mountPath?: any
    }
    service?: {
      annotations?: any
      port?: any
      type?: any
    }
    snykDriverEnabled?: any
    synkDriverEnabled?: any
    tolerations?: any
    ubuntuDriverEnabled?: any
  }
  anchoreEnterpriseGlobal?: {
    enabled?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    imagePullSecretName?: any
    licenseSecretName?: any
  }
  anchoreEnterpriseRbac?: {
    authResources?: any
    enabled?: any
    managerResources?: any
    service?: {
      apiPort?: any
      authPort?: any
    }
  }
  anchoreEnterpriseUi?: {
    affinity?: any
    annotations?: any
    enableProxy?: any
    enableSharedLogin?: any
    enableSsl?: any
    enabled?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    ingress?: {
      hosts?: any
      path?: any
    }
    nodeSelector?: any
    resources?: any
    service?: {
      annotations?: any
      port?: any
      type?: any
    }
    tolerations?: any
  }
  anchoreGlobal?: {
    allowECRUseIAMRole?: any
    cleanupImages?: any
    dbConfig?: {
      connectionPoolSize?: any
      ssl?: any
      timeout?: any
    }
    defaultAdminEmail?: any
    defaultAdminPassword?: any
    enableMetrics?: any
    feedsConnectionTimeout?: any
    feedsReadTimeout?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    ingress?: {
      annotations?: any
      enabled?: any
      tls?: any
    }
    internalServicesSsl?: {
      certDir?: any
      certSecret?: any
      certSecretCertName?: any
      certSecretKeyName?: any
      verifyCerts?: any
    }
    internalServicesSslEnabled?: any
    logLevel?: any
    serviceDir?: any
    syncNvd?: any
    syncPackages?: any
    syncVulnerabilites?: any
    webhooks?: any
    webhooksEnabled?: any
  }
  anchorePolicyEngine?: {
    affinity?: any
    annotations?: any
    cycleTimers?: any
    nodeSelector?: any
    replicaCount?: any
    resources?: any
    service?: {
      annotations?: any
      port?: any
      type?: any
    }
    tolerations?: any
  }
  anchoreSimpleQueue?: {
    affinity?: any
    annotations?: any
    nodeSelector?: any
    replicaCount?: any
    resources?: any
    service?: {
      annotations?: any
      port?: any
      type?: any
    }
    tolerations?: any
  }
  nameOverride?: any
}

