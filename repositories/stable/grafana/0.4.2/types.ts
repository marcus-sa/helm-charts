// Automatically generated

export interface ChartValues {
  nameOverride?: any
  server?: {
    adminPassword?: any
    adminUser?: any
    annotations?: any
    configLocalPath?: any
    dashboardLocalPath?: any
    httpPort?: any
    image?: any
    imagePullPolicy?: any
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
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
    resources?: any
    service?: {
      annotations?: any
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
  }
  serverConfigFile?: any
  serverDashboardFiles?: any
}

