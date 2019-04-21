// Automatically generated

export interface ChartValues {
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
}

