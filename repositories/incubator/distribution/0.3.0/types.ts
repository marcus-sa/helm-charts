// Automatically generated

export interface ChartValues {
  distribution?: {
    env?: {
      artifactoryCi1Url?: any
      artifactoryEdge1Url?: any
      artifactoryEdge2Url?: any
      artifactoryEdge3Url?: any
      artifactoryUrl?: any
      btServerUrl?: any
    }
    externalPort?: any
    fullnameOverride?: any
    image?: {
      imagePullPolicy?: any
      repository?: any
      version?: any
    }
    internalPort?: any
    javaOpts?: {
      xms?: any
      xmx?: any
    }
    name?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      existingClaim?: any
      mountPath?: any
      size?: any
      storageClass?: any
    }
    replicaCount?: any
    resources?: any
    service?: {
      annotations?: any
      type?: any
    }
  }
  distributor?: {
    fullnameOverride?: any
    image?: {
      imagePullPolicy?: any
      pullPolicy?: any
      repository?: any
      version?: any
    }
    javaOpts?: {
      xms?: any
      xmx?: any
    }
    name?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      existingClaim?: any
      mountPath?: any
      size?: any
      storageClass?: any
    }
    replicaCount?: any
    resources?: any
    token?: any
  }
  imagePullSecrets?: any
  initContainerImage?: any
  mongodb?: {
    enabled?: any
    mongodbDatabase?: any
    mongodbPassword?: any
    mongodbUsername?: any
  }
  nameOverride?: any
  redis?: {
    enabled?: any
    master?: {
      port?: any
    }
    redisPassword?: any
  }
}

