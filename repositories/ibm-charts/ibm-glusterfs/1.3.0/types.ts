// Automatically generated

export interface ChartValues {
  arch?: any
  gluster?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    installType?: any
    resources?: any
  }
  heketi?: {
    authSecret?: any
    backupDbSecret?: any
    dbSyncupDelay?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    maxInFlightOperations?: any
    resources?: any
  }
  heketiTopology?: any
  nodeSelector?: {
    key?: any
    value?: any
  }
  podPriorityClass?: any
  preValidation?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    skipDiskValidation?: any
  }
  prometheus?: {
    enabled?: any
    path?: any
    port?: any
  }
  storageClass?: {
    additionalProvisionerParams?: any
    allowVolumeExpansion?: any
    create?: any
    isDefault?: any
    name?: any
    reclaimPolicy?: any
    volumeBindingMode?: any
    volumeNamePrefix?: any
    volumeType?: any
  }
  tolerations?: any
}

