// Automatically generated

export interface ChartValues {
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

