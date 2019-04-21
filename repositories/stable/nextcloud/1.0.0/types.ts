// Automatically generated

export interface ChartValues {
  affinity?: any
  externalDatabase?: {
    database?: any
    host?: any
    password?: any
    user?: any
  }
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    tls?: any
  }
  internalDatabase?: {
    enabled?: any
    name?: any
  }
  mariadb?: {
    db?: {
      name?: any
      password?: any
      user?: any
    }
    enabled?: any
  }
  nameOverride?: any
  nextcloud?: {
    host?: any
    password?: any
    username?: any
  }
  nextcloudPort?: any
  nodeSelector?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
  }
  replicaCount?: any
  resources?: any
  service?: {
    loadBalancerIP?: any
    port?: any
    type?: any
  }
  tolerations?: any
}

