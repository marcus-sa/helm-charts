// Automatically generated

export interface ChartValues {
  affinity?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  nameOverride?: any
  nodeSelector?: any
  ord?: {
    mspID?: any
    tls?: {
      client?: {
        enabled?: any
      }
      server?: {
        enabled?: any
      }
    }
    type?: any
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
    caServerTls?: any
    genesis?: any
    ord?: {
      caCert?: any
      cert?: any
      cred?: any
      intCaCert?: any
      key?: any
      tls?: any
      tlsRootCert?: any
    }
  }
  service?: {
    port?: any
    type?: any
  }
  tolerations?: any
}

