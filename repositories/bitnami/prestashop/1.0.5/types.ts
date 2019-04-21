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
    enabled?: any
    mariadbDatabase?: any
    mariadbRootPassword?: any
    mariadbUser?: any
  }
  nameOverride?: any
  persistence?: {
    apache?: {
      accessMode?: any
      size?: any
      storageClass?: any
    }
    enabled?: any
    prestashop?: {
      accessMode?: any
      size?: any
      storageClass?: any
    }
  }
  prestashopEmail?: any
  prestashopFirstName?: any
  prestashopLastName?: any
  prestashopLoadBalancerIP?: any
  prestashopPassword?: any
  prestashopUsername?: any
  resources?: any
  serviceType?: any
  smtpHost?: any
  smtpPassword?: any
  smtpPort?: any
  smtpProtocol?: any
  smtpUser?: any
}

