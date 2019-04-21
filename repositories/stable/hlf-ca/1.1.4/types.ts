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
    hlfToolsVersion?: any
    intermediate?: {
      parent?: {
        chart?: any
        port?: any
        url?: any
      }
    }
    mountTLS?: any
  }
  db?: {
    ssl?: any
  }
  externalDatabase?: {
    database?: any
    host?: any
    password?: any
    port?: any
    type?: any
    username?: any
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
  mysql?: {
    enabled?: any
    mysqlDatabase?: any
    mysqlUser?: any
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
  postgresql?: {
    enabled?: any
    postgresqlDatabase?: any
    postgresqlUsername?: any
    service?: {
      port?: any
    }
  }
  resources?: any
  service?: {
    port?: any
    type?: any
  }
  tolerations?: any
}

