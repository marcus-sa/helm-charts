// Automatically generated

export interface ChartValues {
  dockerRegistries?: any
  dockerRegistryAccountSecret?: any
  gcs?: {
    bucket?: any
    enabled?: any
    jsonKey?: any
    project?: any
  }
  halyard?: {
    additionalConfig?: {
      configMapKey?: any
      configMapName?: any
      enabled?: any
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
  kubeConfig?: {
    contexts?: any
    deploymentContext?: any
    enabled?: any
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

