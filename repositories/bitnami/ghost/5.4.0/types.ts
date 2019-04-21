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
  fullnameOverride?: any
  ghostBlogTitle?: any
  ghostEmail?: any
  ghostHost?: any
  ghostLoadBalancerIP?: any
  ghostPassword?: any
  ghostPath?: any
  ghostPort?: any
  ghostUsername?: any
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
  ingress?: {
    enabled?: any
    hosts?: any
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
    accessMode?: any
    enabled?: any
    path?: any
    size?: any
    storageClass?: any
  }
  resources?: any
  securityContext?: {
    enabled?: any
    fsGroup?: any
    runAsUser?: any
  }
  serviceType?: any
  smtpHost?: any
  smtpPassword?: any
  smtpPort?: any
  smtpService?: any
  smtpUser?: any
  volumePermissions?: {
    image?: {
      pullPolicy?: any
      registry?: any
      repository?: any
      tag?: any
    }
  }
}

