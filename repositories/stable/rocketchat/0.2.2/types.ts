// Automatically generated

export interface ChartValues {
  config?: {
    SMTP_Host?: any
    SMTP_Password?: any
    SMTP_Port?: any
    SMTP_Username?: any
  }
  host?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    tls?: any
  }
  mongodb?: {
    mongodbDatabase?: any
    mongodbPassword?: any
    mongodbUsername?: any
  }
  nameOverride?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    size?: any
    storageClass?: any
  }
  resources?: any
  securityContext?: {
    enabled?: any
    fsGroup?: any
    runAsUser?: any
  }
  service?: {
    type?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
}

