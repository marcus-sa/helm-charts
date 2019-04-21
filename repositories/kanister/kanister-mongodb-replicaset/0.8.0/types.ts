// Automatically generated

export interface ChartValues {
  auth?: {
    adminPassword?: any
    adminUser?: any
    enabled?: any
    existingAdminSecret?: any
    existingKeySecret?: any
    key?: any
  }
  configmap?: any
  image?: {
    name?: any
    pullPolicy?: any
    tag?: any
  }
  installImage?: {
    name?: any
    pullPolicy?: any
    tag?: any
  }
  kanister?: {
    controller_namespace?: any
  }
  nameOverride?: any
  persistentVolume?: {
    accessModes?: any
    annotations?: any
    enabled?: any
    size?: any
    storageClass?: any
  }
  podAnnotations?: any
  podAntiAffinity?: any
  port?: any
  profile?: {
    create?: any
    defaultProfile?: any
    defaultProfileName?: any
    profileName?: any
  }
  replicaSet?: any
  replicas?: any
  resources?: any
  serviceAnnotations?: any
  tls?: {
    cacert?: any
    cakey?: any
    enabled?: any
  }
}

