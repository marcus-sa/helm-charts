// Automatically generated

export interface ChartValues {
  analysis?: {
    externalPort?: any
    fullnameOverride?: any
    image?: any
    internalPort?: any
    name?: any
    resources?: any
    service?: {
      type?: any
    }
    storage?: {
      sizeLimit?: any
    }
  }
  common?: {
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
    name?: any
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
    enabled?: any
    hosts?: any
    tls?: any
  }
  initContainerImage?: any
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
    name?: any
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
  replicaCount?: any
  server?: {
    externalPort?: any
    fullnameOverride?: any
    image?: any
    internalPort?: any
    loadBalancerSourceRanges?: any
    name?: any
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

