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
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    resources?: any
  }
  heketiTopology?: any
  nodeSelector?: {
    key?: any
    value?: any
  }
  preValidation?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
  }
  resources?: any
  storageClass?: {
    additionalProvisionerParams?: any
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

