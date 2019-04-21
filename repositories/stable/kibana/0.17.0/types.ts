// Automatically generated

export interface ChartValues {
  affinity?: any
  authProxyEnabled?: any
  commandline?: {
    args?: any
  }
  dashboardImport?: {
    dashboards?: any
    timeout?: any
    xpackauth?: {
      enabled?: any
      password?: any
      username?: any
    }
  }
  env?: any
  extraContainers?: any
  files?: any
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
    tls?: any
  }
  livenessProbe?: {
    enabled?: any
    initialDelaySeconds?: any
    timeoutSeconds?: any
  }
  nameOverride?: any
  nodeSelector?: any
  plugins?: {
    enabled?: any
    reset?: any
    values?: any
  }
  podAnnotations?: any
  priorityClassName?: any
  readinessProbe?: {
    enabled?: any
    initialDelaySeconds?: any
    timeoutSeconds?: any
  }
  replicaCount?: any
  resources?: any
  revisionHistoryLimit?: any
  service?: {
    annotations?: any
    authProxyPort?: any
    externalIPs?: any
    externalPort?: any
    internalPort?: any
    labels?: any
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
    nodePort?: any
    type?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  serviceAccountName?: any
  tolerations?: any
}

