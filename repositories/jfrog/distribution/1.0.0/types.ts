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
    masterKey?: any
    name?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      existingClaim?: any
      mountPath?: any
      size?: any
      storageClass?: any
    }
    resources?: any
    service?: {
      annotations?: any
      type?: any
    }
    uid?: any
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
    resources?: any
    token?: any
  }
  global?: {
    mongoAuditUrl?: any
    mongoUrl?: any
    redisUrl?: any
  }
  imagePullSecrets?: any
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    tls?: any
  }
  initContainerImage?: any
  mongodb?: {
    mongodbDatabase?: any
    mongodbPassword?: any
    mongodbRootPassword?: any
    mongodbUsername?: any
    port?: any
  }
  nameOverride?: any
  rbac?: {
    create?: any
    role?: {
      rules?: any
    }
  }
  redis?: {
    disableCommands?: any
    fullnameOverride?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    master?: {
      port?: any
    }
    nameOverride?: any
    password?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      existingClaim?: any
      path?: any
      size?: any
      storageClass?: any
    }
    port?: any
    resources?: any
    uid?: any
  }
  replicaCount?: any
  serviceAccount?: {
    create?: any
    name?: any
  }
}

