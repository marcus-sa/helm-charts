// Automatically generated

export interface ChartValues {
  anchoreAnalyzer?: {
    affinity?: any
    annotations?: any
    concurrentTasksPerWorker?: any
    containerPort?: any
    cycleTimers?: any
    extraEnv?: any
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
    extraEnv?: any
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
    extraEnv?: any
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
    extraEnv?: any
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
    image?: any
    imagePullPolicy?: any
    imagePullSecretName?: any
    licenseSecretName?: any
  }
  anchoreEnterpriseRbac?: {
    authResources?: any
    enabled?: any
    extraEnv?: any
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
    extraEnv?: any
    image?: any
    imagePullPolicy?: any
    nodeSelector?: any
    resources?: any
    service?: {
      annotations?: any
      port?: any
      sessionAffinity?: any
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
    extraEnv?: any
    feedsConnectionTimeout?: any
    feedsReadTimeout?: any
    image?: any
    imagePullPolicy?: any
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
    extraEnv?: any
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
    extraEnv?: any
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
  cloudsql?: {
    enabled?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    instance?: any
  }
  ingress?: {
    annotations?: any
    apiHosts?: any
    apiPath?: any
    enabled?: any
    tls?: any
    uiHosts?: any
    uiPath?: any
  }
  nameOverride?: any
}

