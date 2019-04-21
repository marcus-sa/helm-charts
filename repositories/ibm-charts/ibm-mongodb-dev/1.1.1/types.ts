// Automatically generated

export interface ChartValues {
  arch?: any
  dataVolume?: {
    existingClaimName?: any
    name?: any
    size?: any
    storageClassName?: any
  }
  database?: {
    dbcmd?: any
    name?: any
    password?: any
    user?: any
  }
  image?: {
    imagePullPolicy?: any
    repository?: any
    tag?: any
  }
  nameOverride?: any
  persistence?: {
    enabled?: any
    useDynamicProvisioning?: any
  }
  resources?: any
  secretOverride?: any
  service?: {
    name?: any
    port?: any
    type?: any
  }
  volumeMounts?: {
    data?: {
      subPath?: any
    }
  }
}

