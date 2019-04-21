// Automatically generated

export interface ChartValues {
  amazon?: {
    bucketName?: any
    distribution?: any
    id?: any
    region?: any
    secret?: any
    token?: any
  }
  credentials?: any
  etcd?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    persistence?: {
      accessMode?: any
      enabled?: any
      size?: any
      storageClass?: any
    }
    resources?: {
      requests?: {
        cpu?: any
        memory?: any
      }
    }
  }
  google?: {
    bucketName?: any
  }
  microsoft?: {
    container?: any
    id?: any
    secret?: any
  }
  nameOverride?: any
  pachd?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    replicaCount?: any
    resources?: {
      requests?: {
        cpu?: any
        memory?: any
      }
    }
    worker?: {
      repository?: any
      tag?: any
    }
  }
  s3?: {
    accessKey?: any
    bucketName?: any
    endpoint?: any
    secretKey?: any
    secure?: any
    signature?: any
  }
}

