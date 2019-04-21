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
    env?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    limits?: {
      cpu?: any
      memory?: any
    }
    replicas?: any
    resources?: any
  }
  workers?: {
    default_resources?: {
      cpu?: any
      memory?: any
    }
  }
}

