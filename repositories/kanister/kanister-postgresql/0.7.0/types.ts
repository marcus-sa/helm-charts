// Automatically generated

export interface ChartValues {
  affinity?: any
  fullnameOverride?: any
  image?: any
  imagePullPolicy?: any
  imagePullSecrets?: any
  imageTag?: any
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
  metrics?: {
    customMetrics?: any
    enabled?: any
    image?: any
    imagePullPolicy?: any
    imageTag?: any
    resources?: any
  }
  nameOverride?: any
  networkPolicy?: {
    allowExternal?: any
    enabled?: any
  }
  nodeSelector?: any
  persistence?: {
    accessMode?: any
    annotations?: any
    enabled?: any
    existingClaim?: any
    mountPath?: any
    size?: any
    storageClass?: any
    subPath?: any
  }
  postgresConfig?: any
  postgresDatabase?: any
  postgresInitdbArgs?: any
  postgresPassword?: any
  postgresUser?: any
  resources?: any
  schedulerName?: any
  service?: {
    externalIPs?: any
    nodePort?: any
    port?: any
    type?: any
  }
  tolerations?: any
}

