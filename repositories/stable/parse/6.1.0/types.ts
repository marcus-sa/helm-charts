// Automatically generated

export interface ChartValues {
  dashboard?: {
    appName?: any
    enabled?: any
    image?: {
      pullPolicy?: any
      pullSecrets?: any
      registry?: any
      repository?: any
      tag?: any
    }
    password?: any
    resources?: any
    securityContext?: {
      enabled?: any
      fsGroup?: any
      runAsUser?: any
    }
    username?: any
  }
  global?: {
    imagePullSecrets?: any
    imageRegistry?: any
  }
  image?: {
    registry?: any
    repository?: any
    tag?: any
  }
  mongodb?: {
    usePassword?: any
  }
  nameOverride?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    size?: any
    storageClass?: any
  }
  server?: {
    appId?: any
    host?: any
    image?: {
      pullPolicy?: any
      pullSecrets?: any
      registry?: any
      repository?: any
      tag?: any
    }
    masterKey?: any
    mountPath?: any
    port?: any
    resources?: any
    securityContext?: {
      enabled?: any
      fsGroup?: any
      runAsUser?: any
    }
  }
  service?: {
    externalTrafficPolicy?: any
    loadBalancerIP?: any
    nodePorts?: {
      http?: any
    }
    port?: any
    type?: any
  }
}

