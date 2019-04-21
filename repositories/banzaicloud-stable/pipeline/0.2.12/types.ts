// Automatically generated

export interface ChartValues {
  cache?: {
    persistence?: {
      accessMode?: any
      enabled?: any
      existingClaim?: any
      size?: any
      storageClass?: any
    }
  }
  cloudsql?: {
    dbName?: any
    dbUserName?: any
    dbUserPass?: any
    enabled?: any
    image?: {
      repository?: any
      tag?: any
    }
    instance?: any
  }
  configuration?: {
    anchore?: {
      enabled?: any
      secretName?: any
    }
    auth?: {
      clientid?: any
      clientsecret?: any
      tokenSigningKey?: any
    }
    cert?: {
      ca?: {
        cert?: any
        key?: any
      }
      path?: any
      source?: any
    }
    github?: {
      token?: any
    }
    metrics?: {
      enabled?: any
      port?: any
    }
    monitor?: {
      enabled?: any
    }
    pipelineBasepath?: any
  }
  deploymentAnnotations?: any
  deploymentLabels?: any
  env?: any
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
  }
  metrics?: {
    alertRulesEnabled?: any
    enabled?: any
    port?: any
    serviceMonitor?: {
      additionalLabels?: any
      enabled?: any
      relabellings?: any
    }
  }
  mysql?: {
    enabled?: any
    externalEndpoint?: any
    fullnameOverride?: any
    mysqlDatabase?: any
    mysqlPassword?: any
    mysqlUser?: any
    nameOverride?: any
  }
  nameOverride?: any
  replicaCount?: any
  resources?: any
  service?: {
    externalPort?: any
    internalPort?: any
    name?: any
    tls?: any
    type?: any
  }
  serviceInternal?: {
    externalPort?: any
    internalPort?: any
    name?: any
    tls?: any
    type?: any
  }
  statestore?: {
    persistence?: {
      accessMode?: any
      enabled?: any
      existingClaim?: any
      size?: any
      storageClass?: any
    }
  }
  strategy?: any
  vault?: {
    serviceAddress?: any
    tlsSecret?: any
  }
  worker?: {
    deploymentAnnotations?: any
    deploymentLabels?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    replicaCount?: any
    strategy?: any
  }
}

