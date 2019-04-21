// Automatically generated

export interface ChartValues {
  nameOverride?: any
  server?: {
    adminPassword?: any
    adminUser?: any
    annotations?: any
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
    resources?: any
    service?: {
      annotations?: any
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

