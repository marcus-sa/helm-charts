// Automatically generated

export interface ChartValues {
  fullnameOverride?: any
  jupyter?: {
    affinity?: any
    enabled?: any
    env?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    nodeSelector?: any
    password?: any
    replicas?: any
    resources?: any
    servicePort?: any
    serviceType?: any
    tolerations?: any
  }
  nameOverride?: any
  scheduler?: {
    affinity?: any
    env?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    nodeSelector?: any
    replicas?: any
    resources?: any
    servicePort?: any
    serviceType?: any
    tolerations?: any
  }
  webUI?: {
    servicePort?: any
  }
  worker?: {
    affinity?: any
    default_resources?: {
      cpu?: any
      memory?: any
    }
    env?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    nodeSelector?: any
    replicas?: any
    resources?: {
      limits?: {
        cpu?: any
        memory?: any
      }
    }
    tolerations?: any
  }
}

