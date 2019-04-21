// Automatically generated

export interface ChartValues {
  affinity?: any
  caAddress?: any
  caPassword?: any
  caUsername?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  nameOverride?: any
  nodeSelector?: any
  peer?: {
    couchdbInstance?: any
    databaseType?: any
    hlfToolsVersion?: any
    mspID?: any
  }
  persistence?: {
    accessMode?: any
    annotations?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
  }
  resources?: any
  secrets?: {
    adminCert?: any
    adminKey?: any
    channel?: any
  }
  service?: {
    port?: any
    portEvent?: any
    portRequest?: any
    type?: any
  }
  tolerations?: any
}

