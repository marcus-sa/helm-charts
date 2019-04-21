// Automatically generated

export interface ChartValues {
  adminPassword?: any
  adminUser?: any
  affinity?: any
  annotations?: any
  dashboardProviders?: any
  dashboards?: any
  dashboardsConfigMaps?: any
  datasources?: any
  deploymentStrategy?: any
  downloadDashboardsImage?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  env?: any
  envFromSecret?: any
  extraSecretMounts?: any
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
    labels?: any
    path?: any
    tls?: any
  }
  ldap?: {
    config?: any
    existingSecret?: any
  }
  livenessProbe?: any
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
  rbac?: {
    create?: any
    pspEnabled?: any
  }
  readinessProbe?: any
  replicas?: any
  resources?: any
  schedulerName?: any
  securityContext?: any
  service?: {
    annotations?: any
    clusterIP?: any
    externalIPs?: any
    labels?: any
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
    nodePort?: any
    port?: any
    type?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  sidecar?: {
    dashboards?: {
      enabled?: any
      folder?: any
      label?: any
      searchNamespace?: any
    }
    datasources?: {
      enabled?: any
      label?: any
      searchNamespace?: any
    }
    image?: any
    imagePullPolicy?: any
    resources?: any
  }
  smtp?: {
    existingSecret?: any
  }
  tolerations?: any
}

