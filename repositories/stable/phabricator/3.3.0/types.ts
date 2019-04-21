// Automatically generated

export interface ChartValues {
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
  phabricatorLoadBalancerIP?: any
  phabricatorPassword?: any
  phabricatorUsername?: any
  podAnnotations?: any
  resources?: any
  serviceType?: any
  smtpHost?: any
  smtpPassword?: any
  smtpPort?: any
  smtpProtocol?: any
  smtpUser?: any
}

