// Automatically generated

export interface ChartValues {
  affinity?: any
  certsSecretName?: any
  checkInterval?: any
  concurrent?: any
  envVars?: any
  fullnameOverride?: any
  gitlabUrl?: any
  hostAliases?: any
  image?: any
  imagePullPolicy?: any
  logLevel?: any
  metrics?: {
    enabled?: any
  }
  nameOverride?: any
  nodeSelector?: any
  podAnnotations?: any
  rbac?: {
    clusterWideAccess?: any
    create?: any
    serviceAccountName?: any
  }
  resources?: any
  runnerRegistrationToken?: any
  runnerToken?: any
  runners?: {
    builds?: {
      cpuLimit?: any
      cpuRequests?: any
      memoryLimit?: any
      memoryRequests?: any
    }
    cache?: {
      cachePath?: any
      cacheShared?: any
      cacheType?: any
      gcsBucketName?: any
      s3BucketLocation?: any
      s3BucketName?: any
      s3CacheInsecure?: any
      s3CachePath?: any
      s3ServerAddress?: any
      secretName?: any
    }
    cloneUrl?: any
    env?: any
    helpers?: {
      cpuLimit?: any
      cpuRequests?: any
      image?: any
      memoryLimit?: any
      memoryRequests?: any
    }
    image?: any
    imagePullPolicy?: any
    imagePullSecrets?: any
    locked?: any
    namespace?: any
    nodeSelector?: any
    podAnnotations?: any
    podLabels?: any
    privileged?: any
    secret?: any
    serviceAccountName?: any
    services?: {
      cpuLimit?: any
      cpuRequests?: any
      memoryLimit?: any
      memoryRequests?: any
    }
    tags?: any
  }
  tolerations?: any
  unregisterRunners?: any
}

