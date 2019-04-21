// Automatically generated

export interface ChartValues {
  nameOverride?: any
  pd?: {
    image?: any
    imagePullPolicy?: any
    name?: any
    replicaCount?: any
    resources?: any
    service?: {
      ClientPort?: any
      PeerPort?: any
    }
  }
  replicaCount?: any
  tidb?: {
    image?: any
    imagePullPolicy?: any
    name?: any
    replicaCount?: any
    resources?: any
    service?: {
      mysql?: any
      status?: any
    }
  }
  tikv?: {
    image?: any
    imagePullPolicy?: any
    name?: any
    persistence?: {
      accessMode?: any
      annotations?: any
      enabled?: any
      size?: any
      storageClass?: any
    }
    replicaCount?: any
    resources?: any
    service?: {
      ClientPort?: any
    }
  }
}

