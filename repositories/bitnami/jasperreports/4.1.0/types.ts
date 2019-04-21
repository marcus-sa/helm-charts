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
  jasperreportsEmail?: any
  jasperreportsPassword?: any
  jasperreportsUsername?: any
  mariadb?: {
    db?: {
      name?: any
      user?: any
    }
    enabled?: any
  }
  nameOverride?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    size?: any
    storageClass?: any
  }
  resources?: any
  service?: {
    externalTrafficPolicy?: any
    nodePorts?: {
      http?: any
    }
    port?: any
    type?: any
  }
  smtpEmail?: any
  smtpHost?: any
  smtpPassword?: any
  smtpPort?: any
  smtpProtocol?: any
  smtpUser?: any
}

