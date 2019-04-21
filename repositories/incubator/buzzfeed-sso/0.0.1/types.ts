// Automatically generated

export interface ChartValues {
  auth?: {
    affinity?: any
    annotations?: any
    customSecret?: any
    domain?: any
    nodeSelector?: any
    replicaCount?: any
    resources?: any
    secret?: any
    service?: {
      port?: any
      type?: any
    }
    tls?: {
      secretName?: any
    }
    tolerations?: any
  }
  emailDomain?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    hosts?: any
    tls?: any
  }
  nameOverride?: any
  provider?: {
    google?: {
      adminEmail?: any
      customSecret?: any
      secret?: any
    }
  }
  proxy?: {
    affinity?: any
    annotations?: any
    cluster?: any
    customSecret?: any
    nodeSelector?: any
    providerUrlInternal?: any
    replicaCount?: any
    resources?: any
    secret?: any
    service?: {
      port?: any
      type?: any
    }
    tolerations?: any
  }
  rootDomain?: any
  upstreams?: any
}

