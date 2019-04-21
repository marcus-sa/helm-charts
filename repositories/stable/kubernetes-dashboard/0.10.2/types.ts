// Automatically generated

export interface ChartValues {
  affinity?: any
  annotations?: any
  enableInsecureLogin?: any
  extraArgs?: any
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
    path?: any
    tls?: any
  }
  labels?: any
  livenessProbe?: {
    initialDelaySeconds?: any
    timeoutSeconds?: any
  }
  nameOverride?: any
  nodeSelector?: any
  rbac?: {
    clusterAdminRole?: any
    create?: any
  }
  replicaCount?: any
  resources?: any
  service?: {
    annotations?: any
    externalPort?: any
    labels?: any
    nodePort?: any
    type?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  tolerations?: any
}

