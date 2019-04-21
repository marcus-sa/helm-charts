// Automatically generated

export interface ChartValues {
  fullnameOverride?: any
  jupyter?: {
    enabled?: any
    env?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    password?: any
    replicas?: any
    resources?: any
    servicePort?: any
    serviceType?: any
  }
  nameOverride?: any
  scheduler?: {
    env?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    replicas?: any
    resources?: any
    servicePort?: any
    serviceType?: any
  }
  webUI?: {
    servicePort?: any
  }
  worker?: {
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
    replicas?: any
    resources?: {
      limits?: {
        cpu?: any
        memory?: any
      }
    }
  }
}

