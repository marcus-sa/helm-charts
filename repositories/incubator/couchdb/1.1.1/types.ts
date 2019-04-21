// Automatically generated

export interface ChartValues {
  adminPassword?: any
  adminUsername?: any
  affinity?: any
  allowAdminParty?: any
  clusterSize?: any
  cookieAuthSecret?: any
  couchdbConfig?: {
    chttpd?: {
      require_valid_user?: any
    }
  }
  createAdminSecret?: any
  erlangFlags?: any
  fullnameOverride?: any
  helperImage?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    tls?: any
  }
  initImage?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  nameOverride?: any
  nodeSelector?: any
  persistentVolume?: {
    accessModes?: any
    enabled?: any
    size?: any
    storageClass?: any
  }
  podManagementPolicy?: any
  resources?: any
  service?: {
    enabled?: any
    externalPort?: any
    type?: any
  }
}

