// Automatically generated

export interface ChartValues {
  affinity?: any
  allowEmptyPassword?: any
  externalDatabase?: {
    database?: any
    host?: any
    password?: any
    port?: any
    user?: any
  }
  global?: {
    imageRegistry?: any
  }
  healthcheckHttps?: any
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    enabled?: any
    hosts?: any
    secrets?: any
  }
  livenessProbe?: any
  mariadb?: {
    db?: {
      name?: any
      user?: any
    }
    enabled?: any
  }
  metrics?: {
    enabled?: any
    image?: {
      pullPolicy?: any
      registry?: any
      repository?: any
      tag?: any
    }
    podAnnotations?: any
    resources?: any
  }
  nameOverride?: any
  nodePorts?: {
    http?: any
    https?: any
  }
  nodeSelector?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
  }
  podAnnotations?: any
  readinessProbe?: any
  replicaCount?: any
  resources?: any
  serviceExternalTrafficPolicy?: any
  serviceType?: any
  smtpHost?: any
  smtpPassword?: any
  smtpPort?: any
  smtpProtocol?: any
  smtpUser?: any
  smtpUsername?: any
  tolerations?: any
  wordpressBlogName?: any
  wordpressEmail?: any
  wordpressFirstName?: any
  wordpressLastName?: any
  wordpressPassword?: any
  wordpressTablePrefix?: any
  wordpressUsername?: any
}

