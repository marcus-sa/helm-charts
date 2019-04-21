// Automatically generated

export interface ChartValues {
  affinity?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    size?: any
    storageClass?: any
  }
  rbac?: {
    create?: any
    serviceAccountName?: any
  }
  replicaCount?: any
  resources?: any
  service?: {
    externalIPs?: any
    mountdNodePort?: any
    mountdPort?: any
    nfsNodePort?: any
    nfsPort?: any
    rpcbindNodePort?: any
    rpcbindPort?: any
    type?: any
  }
  storageClass?: {
    create?: any
    defaultClass?: any
    name?: any
    parameters?: any
    provisionerName?: any
  }
  tolerations?: any
}

