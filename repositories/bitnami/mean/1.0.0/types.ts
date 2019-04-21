// Automatically generated

export interface ChartValues {
  applicationPort?: any
  externaldb?: {
    broker?: {
      serviceInstanceName?: any
    }
    secretName?: any
    ssl?: any
    type?: any
  }
  gitImage?: {
    pullPolicy?: any
    registry?: any
    repository?: any
    tag?: any
  }
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    host?: any
    path?: any
    tls?: any
  }
  mongodb?: {
    install?: any
    mongodbDatabase?: any
    mongodbUsername?: any
  }
  nameOverride?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    path?: any
    size?: any
    storageClass?: any
  }
  replicas?: any
  repository?: any
  resources?: any
  revision?: any
  serviceType?: any
}

