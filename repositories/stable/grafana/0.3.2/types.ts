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
    httpPortName?: any
    image?: any
    imagePullPolicy?: any
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      tls?: any
    }
    installPlugins?: any
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
    name?: any
    nodeSelector?: any
    persistentVolume?: {
      accessModes?: any
      annotations?: any
      enabled?: any
      size?: any
      storageClass?: any
    }
    resources?: any
    serviceType?: any
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

