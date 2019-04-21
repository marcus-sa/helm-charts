// Automatically generated

export interface ChartValues {
  affinity?: any
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
    enabled?: any
    hosts?: any
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
  nodeSelector?: any
  persistence?: {
    apache?: {
      accessMode?: any
      size?: any
      storageClass?: any
    }
    enabled?: any
    phabricator?: {
      accessMode?: any
      size?: any
      storageClass?: any
    }
  }
  phabricatorAlternateFileDomain?: any
  phabricatorEmail?: any
  phabricatorFirstName?: any
  phabricatorLastName?: any
  phabricatorPassword?: any
  phabricatorUsername?: any
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
  tolerations?: any
}

