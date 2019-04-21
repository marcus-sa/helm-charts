// Automatically generated

export interface ChartValues {
  analytics?: {
    enabled?: any
    pingInterval?: any
  }
  apiserver?: {
    affinity?: any
    image?: any
    imageTag?: any
    nodeSelector?: any
    ports?: {
      externalPort?: any
      internalPort?: any
    }
    replicas?: any
    tolerations?: any
  }
  cstor?: {
    pool?: {
      image?: any
      imageTag?: any
    }
    poolMgmt?: {
      image?: any
      imageTag?: any
    }
    target?: {
      image?: any
      imageTag?: any
    }
    volumeMgmt?: {
      image?: any
      imageTag?: any
    }
  }
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
  }
  jiva?: {
    image?: any
    imageTag?: any
    replicas?: any
  }
  nameOverride?: any
  ndm?: {
    filters?: {
      excludePaths?: any
      excludeVendors?: any
    }
    image?: any
    imageTag?: any
    nodeSelector?: any
    sparse?: {
      count?: any
      enabled?: any
      path?: any
      size?: any
    }
  }
  policies?: {
    monitoring?: {
      image?: any
      imageTag?: any
    }
  }
  provisioner?: {
    affinity?: any
    image?: any
    imageTag?: any
    mayaPortalUrl?: any
    monitorUrl?: any
    monitorVolumeKey?: any
    nodeSelector?: any
    replicas?: any
    tolerations?: any
  }
  rbac?: {
    create?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  snapshotOperator?: {
    affinity?: any
    controller?: {
      image?: any
      imageTag?: any
    }
    nodeSelector?: any
    provisioner?: {
      image?: any
      imageTag?: any
    }
    replicas?: any
    tolerations?: any
    upgradeStrategy?: any
  }
}

