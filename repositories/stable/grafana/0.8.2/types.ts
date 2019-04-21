// Automatically generated

export interface ChartValues {
  dashboardImports?: {
    activeDeadlineSeconds?: any
    backoffLimit?: any
    dashboards?: any
    enabled?: any
    files?: any
    hook?: any
    image?: any
    restartPolicy?: any
  }
  fullnameOverride?: any
  nameOverride?: any
  server?: {
    adminPassword?: any
    adminUser?: any
    annotations?: any
    antiAffinity?: {
      enabled?: any
      type?: any
    }
    configLocalPath?: any
    dashboardLocalPath?: any
    extraEnv?: any
    httpPort?: any
    image?: any
    imagePullPolicy?: any
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      path?: any
      tls?: any
    }
    installPlugins?: any
    name?: any
    nodeSelector?: any
    persistentVolume?: {
      accessModes?: any
      annotations?: any
      enabled?: any
      existingClaim?: any
      size?: any
      storageClass?: any
      subPath?: any
    }
    readinessProbe?: any
    replicaCount?: any
    resources?: any
    service?: {
      annotations?: any
      clusterIP?: any
      externalIPs?: any
      httpPort?: any
      httpPortName?: any
      loadBalancerIP?: any
      loadBalancerSourceRanges?: any
      nodePort?: any
      type?: any
    }
    setDatasource?: {
      activeDeadlineSeconds?: any
      datasource?: any
      enabled?: any
      image?: any
      restartPolicy?: any
    }
    storageLocalPath?: any
    terminationGracePeriodSeconds?: any
    tolerations?: any
  }
  serverConfigFile?: any
  serverDashboardFiles?: any
}

