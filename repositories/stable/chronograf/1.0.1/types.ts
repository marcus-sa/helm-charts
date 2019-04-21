// Automatically generated

export interface ChartValues {
  env?: any
  envFromSecret?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hostname?: any
    secretName?: any
    tls?: any
  }
  nameOverride?: any
  oauth?: {
    enabled?: any
    github?: {
      client_id?: any
      client_secret?: any
      enabled?: any
      gh_orgs?: any
    }
    google?: {
      client_id?: any
      client_secret?: any
      domains?: any
      enabled?: any
      public_url?: any
    }
    heroku?: {
      client_id?: any
      client_secret?: any
      enabled?: any
      heroku_orgs?: any
    }
    token_secret?: any
  }
  persistence?: {
    accessMode?: any
    enabled?: any
    size?: any
    storageClass?: any
  }
  resources?: any
  service?: {
    replicas?: any
    type?: any
  }
}

