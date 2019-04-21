// Automatically generated

export interface ChartValues {
  adminPassword?: any
  adminUser?: any
  affinity?: any
  annotations?: any
  dashboardProviders?: any
  dashboards?: any
  datasources?: any
  downloadDashboardsImage?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  env?: any
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
    path?: any
    tls?: any
  }
  name?: any
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    accessModes?: any
    annotations?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClassName?: any
    subPath?: any
  }
  plugins?: any
  podAnnotations?: any
  replicas?: any
  resources?: any
  service?: {
    annotations?: any
    clusterIP?: any
    externalIPs?: any
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
    nodePort?: any
    port?: any
    type?: any
  }
  tolerations?: any
}

