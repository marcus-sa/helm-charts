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
  image?: any
  imagePullPolicy?: any
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    tls?: any
  }
  mariadb?: {
    enabled?: any
    mariadbDatabase?: any
    mariadbUser?: any
  }
  moodleEmail?: any
  moodlePassword?: any
  moodleUsername?: any
  name?: any
  nameOverride?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
  }
  resources?: any
  serviceType?: any
  smtpHost?: any
  smtpPassword?: any
  smtpPort?: any
  smtpProtocol?: any
  smtpUser?: any
}

