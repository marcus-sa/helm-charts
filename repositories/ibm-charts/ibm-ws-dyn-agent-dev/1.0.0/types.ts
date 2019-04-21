// Automatically generated

export interface ChartValues {
  agent?: {
    dynamic?: {
      pools?: any
      server?: {
        bkmhostname?: any
        mdmhostname?: any
        port?: any
      }
      useCustomizedCert?: any
    }
    name?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  license?: any
  persistence?: {
    dataPVC?: {
      name?: any
      selector?: {
        label?: any
        value?: any
      }
      size?: any
      storageClassName?: any
    }
    enabled?: any
    useDynamicProvisioning?: any
  }
  replicaCount?: any
  resources?: any
}

