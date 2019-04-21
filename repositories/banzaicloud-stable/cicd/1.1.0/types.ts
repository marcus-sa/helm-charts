// Automatically generated

export interface ChartValues {
  agent?: {
    env?: any
    resources?: any
  }
  annotations?: any
  cloudsql?: {
    dbUserName?: any
    dbUserPass?: any
    enabled?: any
    image?: {
      repository?: any
      tag?: any
    }
    instance?: any
  }
  fullnameOverride?: any
  global?: {
    auth?: {
      clientid?: any
      clientsecret?: any
    }
    pipelineBasepath?: any
    pipelineHost?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    tls?: any
  }
  labels?: any
  mysql?: {
    enabled?: any
    existingSecret?: any
    host?: any
    mysqlDatabase?: any
    mysqlUser?: any
  }
  nameOverride?: any
  replicaCount?: any
  server?: {
    env?: any
    host?: any
    persistentVolume?: {
      accessModes?: any
      annotations?: any
      enabled?: any
      existingClaim?: any
      size?: any
      storageClass?: any
    }
    resources?: any
  }
  service?: {
    httpPort?: any
    nodePort?: any
    type?: any
  }
  sharedSecret?: any
  strategy?: any
}

