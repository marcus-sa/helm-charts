// Automatically generated

export interface ChartValues {
  adminPassword?: any
  adminUsername?: any
  affinity?: any
  caName?: any
  config?: {
    affiliations?: any
    csr?: {
      ca?: {
        pathlength?: any
      }
      names?: {
        c?: any
        l?: any
        o?: any
        ou?: any
        st?: any
      }
    }
    debug?: any
    intermediate?: {
      parent?: {
        chart?: any
        port?: any
        url?: any
      }
    }
  }
  db?: {
    chart?: any
    database?: any
  }
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
  persistence?: {
    accessMode?: any
    annotations?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
  }
  resources?: any
  service?: {
    port?: any
    type?: any
  }
  tolerations?: any
}

