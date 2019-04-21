// Automatically generated

export interface ChartValues {
  azs?: {
    accessKey?: any
    containerName?: any
    enabled?: any
    storageAccountName?: any
  }
  dockerRegistries?: any
  dockerRegistryAccountSecret?: any
  gce?: {
    secretName?: any
  }
  gcs?: {
    bucket?: any
    enabled?: any
    jsonKey?: any
    project?: any
    secret?: any
    secretName?: any
  }
  halyard?: {
    additionalConfigMaps?: {
      create?: any
      data?: any
    }
    additionalScripts?: {
      configMapKey?: any
      configMapName?: any
      create?: any
      data?: any
      enabled?: any
    }
    additionalSecrets?: {
      create?: any
      data?: any
    }
    image?: {
      repository?: any
      tag?: any
    }
    spinnakerVersion?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    host?: any
    tls?: any
  }
  ingressGate?: {
    annotations?: any
    enabled?: any
    host?: any
    tls?: any
  }
  kubeConfig?: {
    contexts?: any
    deploymentContext?: any
    enabled?: any
    omittedNameSpaces?: any
    secretKey?: any
    secretName?: any
  }
  minio?: {
    accessKey?: any
    bucket?: any
    enabled?: any
    secretKey?: any
  }
  nameOverride?: any
  nodeSelector?: any
  rbac?: {
    create?: any
  }
  redis?: {
    password?: any
  }
  s3?: {
    accessKey?: any
    bucket?: any
    enabled?: any
    endpoint?: any
    region?: any
    rootFolder?: any
    secretKey?: any
  }
  serviceAccount?: {
    create?: any
    halyardName?: any
    spinnakerName?: any
  }
  spinnakerFeatureFlags?: any
}

