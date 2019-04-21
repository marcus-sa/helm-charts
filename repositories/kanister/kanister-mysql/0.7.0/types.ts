// Automatically generated

export interface ChartValues {
  configurationFiles?: any
  image?: any
  imagePullPolicy?: any
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
  livenessProbe?: {
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  mysqlAllowEmptyPassword?: any
  mysqlDatabase?: any
  mysqlPassword?: any
  mysqlRootPassword?: any
  mysqlUser?: any
  nameOverride?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
    subPath?: any
  }
  readinessProbe?: {
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  resources?: any
  service?: {
    port?: any
    type?: any
  }
}

