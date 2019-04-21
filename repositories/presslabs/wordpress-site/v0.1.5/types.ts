// Automatically generated

export interface ChartValues {
  code?: {
    contentSubPath?: any
    git?: {
      reference?: any
      repository?: any
      ssh_private_key?: any
    }
    readOnly?: any
  }
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  media?: {
    gcs?: {
      bucket?: any
      google_credentials?: any
      prefix?: any
      project?: any
    }
  }
  memcached?: {
    replicaCount?: any
  }
  mysql?: {
    mysqlConf?: any
    replicaCount?: any
  }
  nameOverride?: any
  replicaCount?: any
  site?: {
    domains?: any
    env?: any
    envFrom?: any
    resources?: any
  }
  tls?: {
    acmeChallengeType?: any
    issuerKind?: any
    issuerName?: any
  }
}

