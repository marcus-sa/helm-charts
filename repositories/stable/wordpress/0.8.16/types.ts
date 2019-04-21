// Automatically generated

export interface ChartValues {
  allowEmptyPassword?: any
  externalDatabase?: {
    database?: any
    host?: any
    password?: any
    port?: any
    user?: any
  }
  healthcheckHttps?: any
  image?: any
  imagePullPolicy?: any
  ingress?: {
    enabled?: any
    hosts?: any
    secrets?: any
  }
  livenessProbe?: any
  mariadb?: {
    enabled?: any
    mariadbDatabase?: any
    mariadbUser?: any
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
    size?: any
    storageClass?: any
  }
  readinessProbe?: any
  resources?: any
  serviceExternalTrafficPolicy?: any
  serviceType?: any
  smtpHost?: any
  smtpPassword?: any
  smtpPort?: any
  smtpProtocol?: any
  smtpUser?: any
  smtpUsername?: any
  wordpressBlogName?: any
  wordpressEmail?: any
  wordpressFirstName?: any
  wordpressLastName?: any
  wordpressPassword?: any
  wordpressUsername?: any
}

