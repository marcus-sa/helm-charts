// Automatically generated

export interface ChartValues {
  affinity?: any
  app?: {
    basePath?: any
    logLevel?: any
  }
  deploymentAnnotations?: any
  deploymentLabels?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    path?: any
    tls?: any
  }
  metrics?: {
    enabled?: any
    port?: any
    serviceMonitor?: {
      additionalLabels?: any
      enabled?: any
    }
  }
  nameOverride?: any
  nodeSelector?: any
  providers?: {
    alibaba?: {
      alibabaAccessKeyId?: any
      alibabaAccessKeySecret?: any
      alibabaRegionId?: any
      enabled?: any
    }
    amazon?: {
      awsAccessKeyId?: any
      awsSecretAccessKey?: any
      enabled?: any
    }
    azure?: {
      azureCredentials?: any
      azureSubscriptionId?: any
      enabled?: any
    }
    google?: {
      enabled?: any
      gceApiKey?: any
      gceCredentials?: any
    }
    oracle?: {
      enabled?: any
      ociFingerprint?: any
      ociKey?: any
      ociRegion?: any
      ociTenancy?: any
      ociUser?: any
    }
  }
  replicaCount?: any
  resources?: any
  service?: {
    internalPort?: any
    port?: any
    type?: any
  }
  tolerations?: any
}

