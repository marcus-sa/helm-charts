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
  osclassEmail?: any
  osclassPassword?: any
  osclassPingEngines?: any
  osclassSaveStats?: any
  osclassUsername?: any
  osclassWebTitle?: any
  persistence?: {
    apache?: {
      accessMode?: any
      size?: any
      storageClass?: any
    }
    enabled?: any
    osclass?: {
      accessMode?: any
      size?: any
      storageClass?: any
    }
  }
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

