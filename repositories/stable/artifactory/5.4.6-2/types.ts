// Automatically generated

export interface ChartValues {
  artReplicaCount?: any
  artifactory?: {
    externalPort?: any
    image?: {
      pullPolicy?: any
      repository?: any
      version?: any
    }
    internalPort?: any
    name?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      mountPath?: any
      size?: any
      storageClass?: any
    }
    service?: {
      type?: any
    }
  }
  database?: {
    env?: {
      name?: any
      pass?: any
      type?: any
      user?: any
    }
    externalPort?: any
    image?: {
      pullPolicy?: any
      repository?: any
      version?: any
    }
    internalPort?: any
    name?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      mountPath?: any
      size?: any
      storageClass?: any
    }
    service?: {
      type?: any
    }
  }
  initContainerImage?: any
  nameOverride?: any
  nginx?: {
    env?: {
      artUrl?: any
      ssl?: any
    }
    externalPortHttp?: any
    externalPortHttps?: any
    image?: {
      pullPolicy?: any
      repository?: any
      version?: any
    }
    internalPortHttp?: any
    internalPortHttps?: any
    name?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      mountPath?: any
      size?: any
      storageClass?: any
    }
    replicaCount?: any
    service?: {
      type?: any
    }
  }
  replicaCount?: any
}

