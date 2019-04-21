// Automatically generated

export interface ChartValues {
  cron?: {
    affinity?: any
    env?: any
    nodeSelector?: any
    replicacount?: any
    resources?: any
    schedulerName?: any
    tolerations?: any
  }
  email?: {
    from_address?: any
    host?: any
    password?: any
    port?: any
    use_tls?: any
    user?: any
  }
  image?: {
    imagePullSecrets?: any
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hostname?: any
    tls?: any
  }
  nameOverride?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    filestore_dir?: any
    size?: any
    storageClass?: any
  }
  postgresDatabase?: any
  postgresUser?: any
  sentrySecret?: any
  service?: {
    externalIPs?: any
    externalPort?: any
    internalPort?: any
    name?: any
    type?: any
  }
  smtpHost?: any
  smtpPort?: any
  smtpUser?: any
  user?: {
    email?: any
    password?: any
  }
  web?: {
    affinity?: any
    env?: any
    nodeSelector?: any
    replicacount?: any
    resources?: any
    schedulerName?: any
    tolerations?: any
  }
  worker?: {
    affinity?: any
    env?: any
    nodeSelector?: any
    replicacount?: any
    resources?: any
    schedulerName?: any
    tolerations?: any
  }
}

