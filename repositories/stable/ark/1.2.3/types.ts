// Automatically generated

export interface ChartValues {
  configuration?: {
    backupStorageProvider?: {
      bucket?: any
      name?: any
    }
  }
  credentials?: {
    existingSecret?: any
    secretContents?: any
    useSecret?: any
  }
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  kubectl?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
  }
  nameOverride?: any
  nodeSelector?: any
  podAnnotations?: any
  rbac?: {
    create?: any
  }
  resources?: any
  serviceAccount?: {
    hook?: {
      create?: any
      name?: any
    }
    server?: {
      create?: any
      name?: any
    }
  }
  tolerations?: any
}

