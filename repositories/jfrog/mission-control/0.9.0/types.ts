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
    mongodb?: {
      image?: {
        repository?: any
        tag?: any
      }
    }
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
    }
    service?: {
      port?: any
    }
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
    home?: any
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
      enabled?: any
      existingClaim?: any
      mountPath?: any
    }
    version?: any
  }
  insightScheduler?: {
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
    name?: any
    persistence?: {
      enabled?: any
      existingClaim?: any
      mountPath?: any
    }
    version?: any
  }
  insightServer?: {
    allowIP?: any
    fullnameOverride?: any
    home?: any
    image?: any
    internalHttpPort?: any
    loggers?: any
    name?: any
    persistence?: {
      enabled?: any
      existingClaim?: any
      mountPath?: any
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
    appName?: any
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
    replicaCount?: any
    repository?: any
    resources?: any
    service?: {
      type?: any
    }
    tolerations?: any
    version?: any
  }
  mongodb?: {
    db?: {
      adminPassword?: any
      adminUser?: any
      insightExecutorDb?: any
      insightPassword?: any
      insightSchedulerDb?: any
      insightServerDb?: any
      insightUser?: any
      mcPassword?: any
      mcUser?: any
      missionControl?: any
    }
    enabled?: any
  }
  nameOverride?: any
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
  serviceAccount?: {
    create?: any
    name?: any
  }
  uid?: any
}

