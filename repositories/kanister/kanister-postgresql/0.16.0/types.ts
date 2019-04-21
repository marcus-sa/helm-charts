// Automatically generated

export interface ChartValues {
  affinity?: any
  fullnameOverride?: any
  image?: any
  imagePullPolicy?: any
  imagePullSecrets?: any
  imageTag?: any
  kanister?: {
    controller_namespace?: any
  }
  metrics?: {
    customMetrics?: any
    enabled?: any
    image?: any
    imagePullPolicy?: any
    imageTag?: any
    resources?: any
  }
  nameOverride?: any
  networkPolicy?: {
    allowExternal?: any
    enabled?: any
  }
  nodeSelector?: any
  persistence?: {
    accessMode?: any
    annotations?: any
    enabled?: any
    existingClaim?: any
    mountPath?: any
    size?: any
    storageClass?: any
    subPath?: any
  }
  postgresConfig?: any
  postgresDatabase?: any
  postgresInitdbArgs?: any
  postgresPassword?: any
  postgresUser?: any
  profile?: {
    create?: any
    defaultProfile?: any
    defaultProfileName?: any
    profileName?: any
  }
  resources?: any
  schedulerName?: any
  service?: {
    externalIPs?: any
    nodePort?: any
    port?: any
    type?: any
  }
  tolerations?: any
}

