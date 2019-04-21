// Automatically generated

export interface ChartValues {
  certsSecretName?: any
  checkInterval?: any
  concurrent?: any
  gitlabUrl?: any
  image?: any
  imagePullPolicy?: any
  nameOverride?: any
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
      cacheShared?: any
      cacheType?: any
      s3BucketLocation?: any
      s3BucketName?: any
      s3CacheInsecure?: any
      s3CachePath?: any
      s3ServerAddress?: any
    }
    helpers?: {
      cpuLimit?: any
      cpuRequests?: any
      memoryLimit?: any
      memoryRequests?: any
    }
    image?: any
    imagePullSecrets?: any
    namespace?: any
    privileged?: any
    services?: {
      cpuLimit?: any
      cpuRequests?: any
      memoryLimit?: any
      memoryRequests?: any
    }
  }
  unregisterRunners?: any
}

