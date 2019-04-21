// Automatically generated

export interface ChartValues {
  auth?: {
    gitlab?: any
  }
  config?: {
    enableSignUpWithEmail?: any
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
  configJSON?: {
    EmailSettings?: {
      InviteSalt?: any
    }
    FileSettings?: {
      PublicLinkSalt?: any
    }
    SqlSettings?: {
      AtRestEncryptKey?: any
      DataSource?: any
      DriverName?: any
    }
  }
  deprecatedHelmConfig?: {
    option?: any
  }
  externalDB?: {
    enabled?: any
    externalConnectionString?: any
    externalDriverType?: any
  }
  extraEnvVars?: any
  extraInitContainers?: any
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
  initContainerImage?: {
    imagePullPolicy?: any
    repository?: any
    tag?: any
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

