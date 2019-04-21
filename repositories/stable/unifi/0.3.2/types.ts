// Automatically generated

export interface ChartValues {
  GID?: any
  UID?: any
  affinity?: any
  controllerService?: {
    annotations?: any
    clusterIP?: any
    externalIPs?: any
    externalTrafficPolicy?: any
    labels?: any
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
    nodePort?: any
    port?: any
    type?: any
  }
  discoveryService?: {
    annotations?: any
    clusterIP?: any
    externalIPs?: any
    externalTrafficPolicy?: any
    labels?: any
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
    nodePort?: any
    port?: any
    type?: any
  }
  fullnameOverride?: any
  guiService?: {
    annotations?: any
    clusterIP?: any
    externalIPs?: any
    externalTrafficPolicy?: any
    labels?: any
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
    nodePort?: any
    port?: any
    type?: any
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
    path?: any
    tls?: any
  }
  mongodb?: {
    databaseName?: any
    dbUri?: any
    enabled?: any
    statDbUri?: any
  }
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
  }
  podAnnotations?: any
  replicaCount?: any
  resources?: any
  runAsRoot?: any
  stunService?: {
    annotations?: any
    clusterIP?: any
    externalIPs?: any
    externalTrafficPolicy?: any
    labels?: any
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
    nodePort?: any
    port?: any
    type?: any
  }
  timezone?: any
  tolerations?: any
  unifiedService?: {
    annotations?: any
    clusterIP?: any
    enabled?: any
    externalIPs?: any
    externalTrafficPolicy?: any
    labels?: any
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
    type?: any
  }
}

