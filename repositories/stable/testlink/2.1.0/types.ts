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
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
    repository?: any
    tag?: any
  }
  mariadb?: {
    db?: {
      name?: any
      user?: any
    }
    enabled?: any
  }
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    apache?: {
      accessMode?: any
      size?: any
      storageClass?: any
    }
    enabled?: any
    testlink?: {
      accessMode?: any
      size?: any
      storageClass?: any
    }
  }
  resources?: any
  serviceType?: any
  smtpConnectionMode?: any
  smtpEnable?: any
  smtpHost?: any
  smtpPassword?: any
  smtpPort?: any
  smtpUser?: any
  testlinkEmail?: any
  testlinkLanguage?: any
  testlinkPassword?: any
  testlinkUsername?: any
}

