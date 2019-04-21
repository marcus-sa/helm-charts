// Automatically generated

export interface ChartValues {
  config?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
    repository?: any
    tag?: any
  }
  imagePullPolicy?: any
  mariadbDatabase?: any
  mariadbPassword?: any
  mariadbRootPassword?: any
  mariadbUser?: any
  metrics?: {
    annotations?: any
    enabled?: any
    image?: any
    imagePullPolicy?: any
    imageTag?: any
    resources?: any
  }
  nameOverride?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
  }
  resources?: any
  securitySettings?: {
    enabled?: any
    fsGroup?: any
    runAsUser?: any
  }
  service?: {
    annotations?: any
    nodePort?: any
    type?: any
  }
  usePassword?: any
}

