// Automatically generated

export interface ChartValues {
  analysis?: {
    affinity?: any
    externalPort?: any
    fullnameOverride?: any
    image?: any
    internalPort?: any
    loggers?: any
    name?: any
    nodeSelector?: any
    replicaCount?: any
    resources?: any
    service?: {
      type?: any
    }
    storage?: {
      sizeLimit?: any
    }
    tolerations?: any
  }
  common?: {
    customInitContainers?: any
    indexAllBuilds?: any
    masterKey?: any
    stdOutEnabled?: any
    xrayConfigPath?: any
    xrayGroupId?: any
    xrayUserId?: any
    xrayVersion?: any
  }
  fullnameOverride?: any
  global?: {
    mongoUrl?: any
    postgresqlUrl?: any
  }
  imagePullPolicy?: any
  imagePullSecrets?: any
  indexer?: {
    externalPort?: any
    fullnameOverride?: any
    image?: any
    internalPort?: any
    loggers?: any
    name?: any
    replicaCount?: any
    resources?: any
    service?: {
      type?: any
    }
    storage?: {
      sizeLimit?: any
    }
  }
  ingress?: {
    annotations?: any
    defaultBackend?: {
      enabled?: any
    }
    enabled?: any
    hosts?: any
    tls?: any
  }
  initContainerImage?: any
  logger?: {
    image?: {
      repository?: any
      tag?: any
    }
  }
  mongodb?: {
    enabled?: any
    mongodbDatabase?: any
    mongodbUsername?: any
  }
  nameOverride?: any
  persist?: {
    externalPort?: any
    fullnameOverride?: any
    image?: any
    internalPort?: any
    loggers?: any
    name?: any
    replicaCount?: any
    resources?: any
    storage?: {
      sizeLimit?: any
    }
  }
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
  server?: {
    externalPort?: any
    fullnameOverride?: any
    image?: any
    internalPort?: any
    loadBalancerSourceRanges?: any
    loggers?: any
    name?: any
    replicaCount?: any
    resources?: any
    service?: {
      externalPort?: any
      type?: any
    }
    serviceName?: any
    storage?: {
      sizeLimit?: any
    }
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
}

