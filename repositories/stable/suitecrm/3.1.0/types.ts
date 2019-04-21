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
  externalTrafficPolicy?: any
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
    mariadbRootPassword?: any
  }
  nameOverride?: any
  persistence?: {
    apache?: {
      accessMode?: any
      size?: any
      storageClass?: any
    }
    enabled?: any
    suitecrm?: {
      accessMode?: any
      size?: any
      storageClass?: any
    }
  }
  resources?: any
  serviceType?: any
  sessionAffinity?: any
  suitecrmEmail?: any
  suitecrmLastName?: any
  suitecrmLoadBalancerIP?: any
  suitecrmPassword?: any
  suitecrmSmtpHost?: any
  suitecrmSmtpPassword?: any
  suitecrmSmtpPort?: any
  suitecrmSmtpProtocol?: any
  suitecrmSmtpUser?: any
  suitecrmUsername?: any
  suitecrmValidateUserIP?: any
}

