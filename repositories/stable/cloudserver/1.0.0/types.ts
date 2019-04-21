// Automatically generated

export interface ChartValues {
  api?: {
    affinity?: any
    autoscaling?: {
      config?: any
      enabled?: any
    }
    credentials?: {
      accessKey?: any
      secretKey?: any
    }
    endpoint?: any
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      path?: any
      tls?: any
    }
    locationConstraints?: any
    logLevel?: any
    nodeSelector?: any
    proxy?: {
      caCert?: any
      http?: any
      https?: any
      no_proxy?: any
    }
    replicaCount?: any
    resources?: any
    service?: {
      annotations?: any
      port?: any
      type?: any
    }
    tolerations?: any
  }
  env?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  localdata?: {
    fullnameOverride?: any
    nodeSelector?: any
    persistentVolume?: {
      accessModes?: any
      annotations?: any
      enabled?: any
      existingClaim?: any
      size?: any
      storageClass?: any
    }
    replicaCount?: any
    resources?: any
  }
  nameOverride?: any
  serviceAccounts?: {
    api?: {
      create?: any
      name?: any
    }
    localdata?: {
      create?: any
      name?: any
    }
  }
}

