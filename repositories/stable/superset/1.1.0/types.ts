// Automatically generated

export interface ChartValues {
  affinity?: any
  configFile?: any
  extraConfigFiles?: any
  extraEnv?: any
  extraEnvFromSecret?: any
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
  initFile?: any
  livenessProbe?: any
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    accessModes?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
  }
  readinessProbe?: any
  replicaCount?: any
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

