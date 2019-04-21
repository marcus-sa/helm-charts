// Automatically generated

export interface ChartValues {
  common?: {
    gid?: any
    uid?: any
  }
  database?: {
    database?: any
    host?: any
    password?: any
    port?: any
    secrets?: {
      password?: {
        key?: any
        name?: any
      }
      user?: {
        key?: any
        name?: any
      }
    }
    user?: any
  }
  distribution?: {
    affinity?: any
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
    nodeSelector?: any
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
    serviceId?: any
    tolerations?: any
  }
  distributor?: {
    affinity?: any
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
    nodeSelector?: any
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
    tolerations?: any
  }
  global?: {
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
  nameOverride?: any
  postgresql?: {
    enabled?: any
    postgresDatabase?: any
    postgresUser?: any
    service?: {
      port?: any
    }
  }
  rbac?: {
    create?: any
    role?: {
      rules?: any
    }
  }
  redis?: {
    affinity?: any
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
    nodeSelector?: any
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
    tolerations?: any
    uid?: any
  }
  replicaCount?: any
  serviceAccount?: {
    create?: any
    name?: any
  }
}

