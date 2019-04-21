// Automatically generated

export interface ChartValues {
  affinity?: any
  annotations?: any
  enableInsecureLogin?: any
  enableSkipLogin?: any
  extraArgs?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    paths?: any
    tls?: any
  }
  labels?: any
  livenessProbe?: {
    initialDelaySeconds?: any
    timeoutSeconds?: any
  }
  nameOverride?: any
  nodeSelector?: any
  podAnnotations?: any
  rbac?: {
    clusterAdminRole?: any
    clusterReadOnlyRole?: any
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

