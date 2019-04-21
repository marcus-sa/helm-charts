// Automatically generated

export interface ChartValues {
  affinity?: any
  annotations?: any
  busyboxImage?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  efsProvisioner?: {
    awsRegion?: any
    efsFileSystemId?: any
    path?: any
    provisionerName?: any
    storageClass?: {
      gidAllocate?: {
        enabled?: any
      }
      isDefault?: any
      mountOptions?: any
      name?: any
      reclaimPolicy?: any
    }
  }
  global?: {
    deployEnv?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  nameOverride?: any
  nodeSelector?: any
  podAnnotations?: any
  priorityClassName?: any
  rbac?: {
    create?: any
  }
  replicaCount?: any
  revisionHistoryLimit?: any
  serviceAccount?: {
    create?: any
    name?: any
  }
}

