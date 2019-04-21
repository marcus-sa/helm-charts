// Automatically generated

export interface ChartValues {
  alertmanager?: {
    httpPort?: any
    httpPortName?: any
    image?: any
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      tls?: any
    }
    name?: any
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
    serviceType?: any
    storagePath?: any
  }
  alertmanagerFiles?: any
  configmapReload?: {
    image?: any
    name?: any
  }
  imagePullPolicy?: any
  kubeStateMetrics?: {
    httpPort?: any
    httpPortName?: any
    image?: any
    name?: any
    serviceType?: any
  }
  nameOverride?: any
  server?: {
    annotations?: any
    extraArgs?: any
    httpPort?: any
    httpPortName?: any
    image?: any
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      tls?: any
    }
    name?: any
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
    serviceType?: any
    storageLocalPath?: any
    terminationGracePeriodSeconds?: any
  }
  serverFiles?: any
}

