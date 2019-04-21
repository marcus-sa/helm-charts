// Automatically generated

export interface ChartValues {
  adminPassword?: any
  affinity?: any
  configPassword?: any
  customLdifFiles?: any
  env?: any
  existingSecret?: any
  extraLabels?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  nameOverride?: any
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
    annotations?: any
    clusterIP?: any
    externalIPs?: any
    ldapPort?: any
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
    sslLdapPort?: any
    type?: any
  }
  strategy?: any
  test?: {
    enabled?: any
    image?: {
      repository?: any
      tag?: any
    }
  }
  tls?: {
    CA?: {
      enabled?: any
      secret?: any
    }
    enabled?: any
    secret?: any
  }
  tolerations?: any
}

