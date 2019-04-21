// Automatically generated

export interface ChartValues {
  agentIngress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    rejectServiceName?: any
    rejectServicePort?: any
    tls?: any
  }
  ec2Locations?: {
    customUserDataSecret?: any
    enabled?: any
    userData?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hostname?: any
    hosts?: any
    tls?: any
  }
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    size?: any
    storageClass?: any
  }
  replicaCount?: any
  resources?: any
  service?: {
    externalPort?: any
    internalPort?: any
    name?: any
    type?: any
  }
}

