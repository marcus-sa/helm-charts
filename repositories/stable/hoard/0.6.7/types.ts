// Automatically generated

export interface ChartValues {
  affinity?: any
  config?: {
    secrets?: {
      openpgp?: {
        file?: any
        privateid?: any
      }
    }
    storage?: {
      filesystemconfig?: {
        rootdirectory?: any
      }
      storagetype?: any
    }
  }
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    path?: any
    tls?: any
  }
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    accessMode?: any
    annotations?: any
    size?: any
    storageClass?: any
  }
  replicaCount?: any
  resources?: any
  secrets?: {
    creds?: any
    keyring?: any
  }
  service?: {
    port?: any
    type?: any
  }
  tolerations?: any
}

