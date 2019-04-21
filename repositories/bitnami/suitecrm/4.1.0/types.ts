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
  global?: {
    imageRegistry?: any
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
    mariadbRootPassword?: any
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
  persistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
  }
  podAnnotations?: any
  resources?: any
  serviceType?: any
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

