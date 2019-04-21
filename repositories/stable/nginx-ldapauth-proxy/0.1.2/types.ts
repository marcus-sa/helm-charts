// Automatically generated

export interface ChartValues {
  affinity?: any
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
    hosts?: any
    tls?: any
  }
  nameOverride?: any
  nodeSelector?: any
  proxy?: {
    authName?: any
    host?: any
    ldapBindDN?: any
    ldapDN?: any
    ldapFilter?: any
    ldapGroup?: any
    ldapHost?: any
    ldapPort?: any
    port?: any
    requires?: any
  }
  replicaCount?: any
  resources?: any
  secrets?: {
    ldapBindPassword?: any
  }
  service?: {
    externalPort?: any
    internalPort?: any
    name?: any
    type?: any
  }
  tolerations?: any
}

