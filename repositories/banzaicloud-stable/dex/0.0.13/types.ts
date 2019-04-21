// Automatically generated

export interface ChartValues {
  certs?: {
    caName?: any
    tlsName?: any
  }
  cloudsql?: {
    enabled?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    instance?: any
  }
  config?: {
    connectors?: any
    enablePasswordDB?: any
    frontend?: {
      theme?: any
    }
    grpc?: {
      addr?: any
    }
    issuer?: any
    logger?: {
      level?: any
    }
    staticClients?: any
    staticPasswords?: any
    storage?: {
      config?: {
        database?: any
        host?: any
        password?: any
        ssl?: {
          mode?: any
        }
        user?: any
      }
      type?: any
    }
    web?: {
      http?: any
    }
  }
  env?: any
  envFrom?: any
  exampleApp?: {
    clientID?: any
    clientSecret?: any
    enabled?: any
    redirectURI?: any
  }
  extraVolumeMounts?: any
  extraVolumes?: any
  fullnameOverride?: any
  image?: any
  imagePullPolicy?: any
  imageTag?: any
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    tls?: any
  }
  nameOverride?: any
  nodeSelector?: any
  ports?: any
  postgresql?: {
    enabled?: any
    postgresqlDatabase?: any
    postgresqlPassword?: any
    postgresqlUsername?: any
  }
  rbac?: {
    create?: any
  }
  replicas?: any
  resources?: any
  service?: {
    annotations?: any
    externalIPs?: any
    type?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
}

