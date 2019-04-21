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
    imagePullSecrets?: any
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
    annotations?: any
    certManager?: any
    enabled?: any
    hosts?: any
  }
  mariadb?: {
    db?: {
      name?: any
      user?: any
    }
    enabled?: any
  }
  metrics?: {
    enabled?: any
    image?: {
      pullPolicy?: any
      pullSecrets?: any
      registry?: any
      repository?: any
      tag?: any
    }
    podAnnotations?: any
    resources?: any
  }
  nameOverride?: any
  persistence?: {
    apache?: {
      accessMode?: any
      size?: any
      storageClass?: any
    }
    enabled?: any
    phpbb?: {
      accessMode?: any
      size?: any
      storageClass?: any
    }
  }
  phpbbEmail?: any
  phpbbPassword?: any
  phpbbUser?: any
  podAnnotations?: any
  resources?: any
  service?: {
    externalTrafficPolicy?: any
    httpsPort?: any
    loadBalancerIP?: any
    nodePorts?: {
      http?: any
      https?: any
    }
    port?: any
    type?: any
  }
  smtpHost?: any
  smtpPassword?: any
  smtpPort?: any
  smtpProtocol?: any
  smtpUser?: any
}

