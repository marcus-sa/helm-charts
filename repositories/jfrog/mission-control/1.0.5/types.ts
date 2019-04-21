// Automatically generated

export interface ChartValues {
  database?: {
    host?: any
    jfexPassword?: any
    jfexSchema?: any
    jfexUsername?: any
    jfisPassword?: any
    jfisSchema?: any
    jfisUsername?: any
    jfmcPassword?: any
    jfmcSchema?: any
    jfmcUsername?: any
    jfscPassword?: any
    jfscSchema?: any
    jfscUsername?: any
    name?: any
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
    type?: any
    user?: any
  }
  dbSetup?: {
    postgresql?: {
      image?: {
        repository?: any
        tag?: any
      }
    }
  }
  elasticsearch?: {
    enabled?: any
    env?: {
      clusterName?: any
      maxMapCount?: any
      minimumMasterNodes?: any
      networkHost?: any
      transportHost?: any
    }
    httpPort?: any
    image?: {
      repository?: any
      tag?: any
    }
    imagePullPolicy?: any
    initContainerImage?: any
    javaOpts?: {
      xms?: any
      xmx?: any
    }
    name?: any
    password?: any
    persistence?: {
      accessMode?: any
      existingClaim?: any
      mountPath?: any
      size?: any
      storageClass?: any
    }
    resources?: any
    transportPort?: any
    url?: any
    username?: any
  }
  imagePullPolicy?: any
  imagePullSecrets?: any
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    path?: any
    tls?: any
  }
  initContainerImage?: any
  insightExecutor?: {
    fullnameOverride?: any
    image?: any
    internalPort?: any
    javaOpts?: {
      other?: any
      xms?: any
      xmx?: any
    }
    loggers?: any
    name?: any
    persistence?: {
      accessMode?: any
      existingClaim?: any
      mountPath?: any
      size?: any
      storageClass?: any
    }
    version?: any
  }
  insightScheduler?: {
    fullnameOverride?: any
    image?: any
    internalPort?: any
    javaOpts?: {
      other?: any
      xms?: any
      xmx?: any
    }
    loggers?: any
    name?: any
    persistence?: {
      accessMode?: any
      existingClaim?: any
      mountPath?: any
      size?: any
      storageClass?: any
    }
    version?: any
  }
  insightServer?: {
    allowIP?: any
    fullnameOverride?: any
    image?: any
    internalHttpPort?: any
    loggers?: any
    name?: any
    persistence?: {
      accessMode?: any
      existingClaim?: any
      mountPath?: any
      size?: any
      storageClass?: any
    }
    version?: any
  }
  logger?: {
    image?: {
      repository?: any
      tag?: any
    }
  }
  missionControl?: {
    affinity?: any
    customInitContainers?: any
    dist?: any
    externalPort?: any
    fullnameOverride?: any
    home?: any
    image?: any
    internalPort?: any
    javaOpts?: {
      other?: any
      xms?: any
      xmx?: any
    }
    loggers?: any
    mcKey?: any
    missionControlUrl?: any
    name?: any
    nodeSelector?: any
    osDist?: any
    osType?: any
    osVersion?: any
    package?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      existingClaim?: any
      mountPath?: any
      size?: any
      storageClass?: any
    }
    propertyOverride?: any
    repository?: any
    resources?: any
    service?: {
      type?: any
    }
    tolerations?: any
    version?: any
  }
  nameOverride?: any
  networkpolicy?: any
  podRestartTime?: any
  postgresql?: {
    db?: {
      jfexPassword?: any
      jfexSchema?: any
      jfexUsername?: any
      jfisPassword?: any
      jfisSchema?: any
      jfisUsername?: any
      jfmcPassword?: any
      jfmcSchema?: any
      jfmcUsername?: any
      jfscPassword?: any
      jfscSchema?: any
      jfscUsername?: any
      name?: any
      sslmode?: any
      tablespace?: any
    }
    enabled?: any
    postgresPassword?: any
    postgresUsername?: any
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
  replicaCount?: any
  serviceAccount?: {
    create?: any
    name?: any
  }
  uid?: any
}

