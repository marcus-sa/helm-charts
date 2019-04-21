// Automatically generated

export interface ChartValues {
  affinity?: any
  autoDiscovery?: {
    clusterName?: any
  }
  autoscalingGroups?: any
  autoscalingGroupsnamePrefix?: any
  awsRegion?: any
  azure?: {
    clientID?: any
    clientSecret?: any
    clusterName?: any
    nodeResourceGroup?: any
    resourceGroup?: any
    subscriptionID?: any
    tenantID?: any
    vmType?: any
  }
  cloudConfigPath?: any
  cloudProvider?: any
  extraArgs?: any
  extraEnv?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  nameOverride?: any
  nodeSelector?: any
  podAnnotations?: any
  podDisruptionBudget?: any
  podLabels?: any
  rbac?: {
    create?: any
    pspEnabled?: any
    serviceAccountName?: any
  }
  replicaCount?: any
  resources?: any
  service?: {
    annotations?: any
    clusterIP?: any
    externalIPs?: any
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
    portName?: any
    servicePort?: any
    type?: any
  }
  spotinst?: {
    account?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    token?: any
  }
  sslCertPath?: any
  tolerations?: any
}

