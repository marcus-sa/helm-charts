// Automatically generated

export interface ChartValues {
  auth?: {
    gitlab?: any
  }
  config?: {
    feedbackEmail?: any
    feedbackName?: any
    fileBucketName?: any
    filesAccessKey?: any
    filesSecretKey?: any
    siteName?: any
    siteUrl?: any
    smtpConnection?: any
    smtpPassword?: any
    smtpPort?: any
    smtpServer?: any
    smtpUsername?: any
  }
  externalDB?: {
    enabled?: any
    externalConnectionString?: any
    externalDriverType?: any
  }
  fullnameOverride?: any
  image?: {
    imagePullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    enabled?: any
    hosts?: any
    tls?: any
  }
  mysql?: {
    mysqlDatabase?: any
    mysqlPassword?: any
    mysqlUser?: any
  }
  nameOverride?: any
  persistence?: {
    data?: {
      accessMode?: any
      annotations?: any
      enabled?: any
      existingClaim?: any
      size?: any
      storageClass?: any
    }
    existingClaim?: any
  }
  resources?: any
  revisionHistoryLimit?: any
  service?: {
    externalPort?: any
    internalPort?: any
    type?: any
  }
}

