// Automatically generated

export interface ChartValues {
  appVersion?: any
  client?: {
    antiAffinity?: any
    heapSize?: any
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
    name?: any
    nodeSelector?: any
    podAnnotations?: any
    podDisruptionBudget?: {
      enabled?: any
      maxUnavailable?: any
      minAvailable?: any
    }
    priorityClassName?: any
    replicas?: any
    resources?: any
    serviceAnnotations?: any
    serviceType?: any
    tolerations?: any
  }
  cluster?: {
    config?: any
    env?: any
    keystoreSecret?: any
    name?: any
    xpackEnable?: any
  }
  data?: {
    antiAffinity?: any
    exposeHttp?: any
    heapSize?: any
    name?: any
    nodeSelector?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      name?: any
      size?: any
      storageClass?: any
    }
    podAnnotations?: any
    podDisruptionBudget?: {
      enabled?: any
      maxUnavailable?: any
      minAvailable?: any
    }
    priorityClassName?: any
    replicas?: any
    resources?: any
    terminationGracePeriodSeconds?: any
    tolerations?: any
    updateStrategy?: {
      type?: any
    }
  }
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    repository?: any
    tag?: any
  }
  master?: {
    antiAffinity?: any
    exposeHttp?: any
    heapSize?: any
    name?: any
    nodeSelector?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      name?: any
      size?: any
      storageClass?: any
    }
    podAnnotations?: any
    podDisruptionBudget?: {
      enabled?: any
      maxUnavailable?: any
      minAvailable?: any
    }
    priorityClassName?: any
    replicas?: any
    resources?: any
    tolerations?: any
    updateStrategy?: {
      type?: any
    }
  }
  nameOverride?: any
}

