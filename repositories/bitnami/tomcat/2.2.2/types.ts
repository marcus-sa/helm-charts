// Automatically generated

export interface ChartValues {
  global?: {
    imagePullSecrets?: any
    imageRegistry?: any
  }
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
    repository?: any
    tag?: any
  }
  nameOverride?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    size?: any
    storageClass?: any
  }
  resources?: any
  securityContext?: {
    enabled?: any
    fsGroup?: any
    runAsUser?: any
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
  tomcatAllowRemoteManagement?: any
  tomcatPassword?: any
  tomcatUsername?: any
}

