// Automatically generated

export interface ChartValues {
  affinity?: any
  azureStorageAccessKey?: any
  azureStorageAccountName?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    baseUrl?: any
    enabled?: any
    hosts?: any
    tls?: any
  }
  interpreterConnectTimeout?: any
  logService?: {
    applicationFacility?: any
    applicationLogLevel?: any
    applicationLogPattern?: any
    applicationLogPort?: any
    applicationLoggerName?: any
    host?: any
    sparkFacility?: any
    sparkLogLevel?: any
    sparkLogPattern?: any
    sparkLogPort?: any
    zeppelinFacility?: any
    zeppelinLogLevel?: any
    zeppelinLogPattern?: any
    zeppelinLogPort?: any
  }
  nameOverride?: any
  nodeSelector?: any
  notebookStorage?: {
    path?: any
    type?: any
  }
  password?: any
  replicaCount?: any
  resources?: {
    limits?: {
      cpu?: any
      memory?: any
    }
    requests?: {
      cpu?: any
      memory?: any
    }
  }
  service?: {
    externalPort?: any
    internalPort?: any
    rpcPort?: any
    type?: any
  }
  sparkEventLogStorage?: {
    aliAccessKeyId?: any
    aliOssEndpoint?: any
    aliOssRegion?: any
    aliSecretAccessKey?: any
    apiKey?: any
    awsAccessKeyId?: any
    awsSecretAccessKey?: any
    azureStorageAccessKey?: any
    azureStorageAccountName?: any
    cloudProvider?: any
    googleJson?: any
    logDirectory?: any
    oracleApiKeyFingerprint?: any
    oracleHost?: any
    oracleRegion?: any
    oracleTenancyId?: any
    oracleUserId?: any
    secretName?: any
  }
  sparkSubmitOptions?: {
    driverServiceAccountName?: any
    k8sNameSpace?: any
    sparkDriverCores?: any
    sparkDriverLimitCores?: any
    sparkDriverMemory?: any
    sparkExecutorCores?: any
    sparkExecutorMemory?: any
    sparkImage?: {
      name?: any
      tag?: any
    }
    sparkLocalDir?: any
  }
  tolerations?: any
  userCredentialSecretName?: any
  username?: any
}

