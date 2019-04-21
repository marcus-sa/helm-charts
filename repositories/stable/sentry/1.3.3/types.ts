// Automatically generated

export interface ChartValues {
  config?: {
    configYml?: any
    sentryConfPy?: any
  }
  cron?: {
    affinity?: any
    env?: any
    nodeSelector?: any
    podAnnotations?: any
    podLabels?: any
    replicacount?: any
    resources?: any
    schedulerName?: any
    tolerations?: any
  }
  email?: {
    existingSecret?: any
    from_address?: any
    host?: any
    password?: any
    port?: any
    use_tls?: any
    user?: any
  }
  fullnameOverride?: any
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
    existingClaim?: any
    filestore_dir?: any
    size?: any
    storageClass?: any
  }
  postgresql?: {
    enabled?: any
    existingSecret?: any
    postgresDatabase?: any
    postgresHost?: any
    postgresPassword?: any
    postgresPort?: any
    postgresUser?: any
  }
  redis?: {
    enabled?: any
    existingSecret?: any
    host?: any
    password?: any
    port?: any
  }
  sentrySecret?: any
  service?: {
    annotations?: any
    externalIPs?: any
    externalPort?: any
    internalPort?: any
    name?: any
    nodePort?: any
    type?: any
  }
  smtpHost?: any
  smtpPort?: any
  smtpUser?: any
  user?: {
    create?: any
    email?: any
    password?: any
  }
  web?: {
    affinity?: any
    env?: any
    nodeSelector?: any
    podAnnotations?: any
    replicacount?: any
    resources?: any
    schedulerName?: any
    tolerations?: any
  }
  worker?: {
    affinity?: any
    env?: any
    nodeSelector?: any
    podAnnotations?: any
    podLabels?: any
    replicacount?: any
    resources?: any
    schedulerName?: any
    tolerations?: any
  }
}

