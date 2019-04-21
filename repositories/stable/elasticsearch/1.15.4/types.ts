// Automatically generated

export interface ChartValues {
  appVersion?: any
  client?: {
    antiAffinity?: any
    heapSize?: any
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      path?: any
      tls?: any
    }
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
    name?: any
    nodeAffinity?: any
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
    additionalJavaOpts?: any
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
    hooks?: {
      drain?: {
        enabled?: any
      }
    }
    name?: any
    nodeAffinity?: any
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
  extraInitContainers?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    repository?: any
    tag?: any
  }
  initImage?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  master?: {
    antiAffinity?: any
    exposeHttp?: any
    heapSize?: any
    name?: any
    nodeAffinity?: any
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
  podSecurityPolicy?: {
    annotations?: any
    enabled?: any
  }
  serviceAccounts?: {
    client?: {
      create?: any
      name?: any
    }
    data?: {
      create?: any
      name?: any
    }
    master?: {
      create?: any
      name?: any
    }
  }
}

