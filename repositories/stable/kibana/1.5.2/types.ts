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
  deployment?: {
    annotations?: any
  }
  env?: any
  extraConfigMapMounts?: any
  extraContainers?: any
  extraVolumeMounts?: any
  extraVolumes?: any
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
  initContainers?: any
  livenessProbe?: {
    enabled?: any
    initialDelaySeconds?: any
    timeoutSeconds?: any
  }
  nameOverride?: any
  nodeSelector?: any
  persistentVolumeClaim?: {
    accessModes?: any
    annotations?: any
    enabled?: any
    existingClaim?: any
    name?: any
    size?: any
    storageClass?: any
  }
  plugins?: {
    enabled?: any
    reset?: any
    values?: any
  }
  podAnnotations?: any
  podLabels?: any
  priorityClassName?: any
  readinessProbe?: {
    enabled?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  replicaCount?: any
  resources?: any
  revisionHistoryLimit?: any
  securityContext?: {
    allowPrivilegeEscalation?: any
    enabled?: any
    fsGroup?: any
    runAsUser?: any
  }
  service?: {
    annotations?: any
    authProxyPort?: any
    clusterIP?: any
    externalIPs?: any
    externalPort?: any
    internalPort?: any
    labels?: any
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
    nodePort?: any
    portName?: any
    type?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  serviceAccountName?: any
  tolerations?: any
}

