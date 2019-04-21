// Automatically generated

export interface ChartValues {
  disableInitialization?: any
  global?: {
    imageRegistry?: any
  }
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
    repository?: any
    tag?: any
  }
  javaOpts?: any
  jenkinsHome?: any
  jenkinsPassword?: any
  jenkinsUser?: any
  metrics?: {
    enabled?: any
    image?: {
      pullPolicy?: any
      registry?: any
      repository?: any
      tag?: any
    }
    podAnnotations?: any
    resources?: any
  }
  nameOverride?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    size?: any
    storageClass?: any
  }
  podAnnotations?: any
  resources?: any
  service?: {
    externalTrafficPolicy?: any
    httpsPort?: any
    loadBalancerIP?: any
    nodePorts?: {
      http?: any
      https?: any
    }
    port?: any
    type?: any
  }
}

