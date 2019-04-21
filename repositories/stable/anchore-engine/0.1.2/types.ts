// Automatically generated

export interface ChartValues {
  coreConfig?: {
    logLevel?: any
    policyBundleSyncEnabled?: any
    replicaCount?: any
    resources?: any
    ssl?: {
      certDir?: any
      certSecret?: any
      certSecretCertName?: any
      certSecretKeyName?: any
    }
    webhooks?: {
      config?: any
      enabled?: any
    }
  }
  globalConfig?: {
    allowECRUseIAMRole?: any
    cleanupImages?: any
    configDir?: any
    cycleTimers?: any
    dbConfig?: {
      connectionPoolSize?: any
      ssl?: any
    }
    internalServicesSslEnabled?: any
    internalServicesSslVerifyCerts?: any
    users?: {
      admin?: {
        anchoreIOCredentials?: {
          password?: any
          useAnonymous?: any
          user?: any
        }
        email?: any
        password?: any
      }
    }
  }
  image?: {
    pullPolicy?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    tls?: any
  }
  nameOverride?: any
  postgresql?: {
    enabled?: any
    externalEndpoint?: any
    postgresDatabase?: any
    postgresPassword?: any
    postgresUser?: any
    sslEnabled?: any
  }
  service?: {
    hostId?: any
    ports?: {
      api?: any
      catalog?: any
      k8sImagePolicyWebhook?: any
      policy?: any
      queue?: any
    }
    type?: any
  }
  workerConfig?: {
    analysisScratchVolume?: {
      details?: any
      mountPath?: any
    }
    analyzerMode?: any
    analyzerScratchDir?: any
    concurrentTasksPerWorker?: any
    cycleTimerSeconds?: any
    logLevel?: any
    replicaCount?: any
    resources?: any
    ssl?: {
      CertDir?: any
      certDir?: any
      certSecret?: any
      certSecretCertName?: any
      certSecretKeyName?: any
    }
  }
}

