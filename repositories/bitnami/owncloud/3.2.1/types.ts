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
  owncloudEmail?: any
  owncloudLoadBalancerIP?: any
  owncloudPassword?: any
  owncloudPort?: any
  owncloudUsername?: any
  persistence?: {
    apache?: {
      accessMode?: any
      existingClaim?: any
      size?: any
      storageClass?: any
    }
    enabled?: any
    owncloud?: {
      accessMode?: any
      existingClaim?: any
      size?: any
      storageClass?: any
    }
  }
  resources?: any
  serviceType?: any
}

