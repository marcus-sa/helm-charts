// Automatically generated

export interface ChartValues {
  auth?: {
    adminPassword?: any
    adminUser?: any
    enabled?: any
    existingAdminSecret?: any
    existingKeySecret?: any
    key?: any
  }
  configmap?: any
  image?: {
    name?: any
    pullPolicy?: any
    tag?: any
  }
  installImage?: {
    name?: any
    pullPolicy?: any
    tag?: any
  }
  kanister?: {
    controller_namespace?: any
    create_profile?: any
    profile_namespace?: any
    s3_api_key?: any
    s3_api_secret?: any
    s3_bucket?: any
    s3_endpoint?: any
    s3_prefix?: any
    s3_region?: any
    s3_verify_ssl?: any
  }
  nameOverride?: any
  persistentVolume?: {
    accessModes?: any
    annotations?: any
    enabled?: any
    size?: any
    storageClass?: any
  }
  podAnnotations?: any
  podAntiAffinity?: any
  port?: any
  replicaSet?: any
  replicas?: any
  resources?: any
  serviceAnnotations?: any
  tls?: {
    cacert?: any
    cakey?: any
    enabled?: any
  }
}

