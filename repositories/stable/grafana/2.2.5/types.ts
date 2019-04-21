// Automatically generated

export interface ChartValues {
  admin?: {
    existingSecret?: any
    passwordKey?: any
    userKey?: any
  }
  adminPassword?: any
  adminUser?: any
  affinity?: any
  annotations?: any
  chownDataImage?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  command?: any
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
  env?: {
    GF_SECURITY_ADMIN_PASSWORD?: any
    GF_SECURITY_ADMIN_USER?: any
  }
  envFromSecret?: any
  extraConfigmapMounts?: any
  extraContainers?: any
  extraSecretMounts?: any
  extraVolumeMounts?: any
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
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    accessModes?: any
    annotations?: any
    enabled?: any
    existingClaim?: any
    initChownData?: any
    size?: any
    storageClassName?: any
    subPath?: any
  }
  plugins?: any
  podAnnotations?: any
  priorityClassName?: any
  rbac?: {
    create?: any
    namespaced?: any
    pspEnabled?: any
    pspUseAppArmor?: any
  }
  readinessProbe?: any
  replicas?: any
  resources?: any
  schedulerName?: any
  securityContext?: {
    runAsUser?: any
  }
  service?: {
    annotations?: any
    clusterIP?: any
    externalIPs?: any
    labels?: any
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
    nodePort?: any
    port?: any
    targetPort?: any
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
    passwordKey?: any
    userKey?: any
  }
  tolerations?: any
}

