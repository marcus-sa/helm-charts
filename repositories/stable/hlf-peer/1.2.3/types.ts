// Automatically generated

export interface ChartValues {
  affinity?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    path?: any
    tls?: any
  }
  nameOverride?: any
  nodeSelector?: any
  peer?: {
    couchdbInstance?: any
    databaseType?: any
    mspID?: any
    tls?: {
      client?: {
        enabled?: any
      }
      server?: {
        enabled?: any
      }
    }
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
    ordTlsRootCert?: any
    peer?: {
      caCert?: any
      cert?: any
      intCaCert?: any
      key?: any
      tls?: any
      tlsClient?: any
      tlsClientRootCert?: any
      tlsRootCert?: any
    }
  }
  service?: {
    port?: any
    portEvent?: any
    portRequest?: any
    type?: any
  }
  tolerations?: any
}

