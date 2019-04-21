// Automatically generated

export interface ChartValues {
  fullnameOverride?: any
  nameOverride?: any
  namespace?: any
  namespaceAttributes?: any
  roleBindings?: any
  serviceAccounts?: any
  tiller?: {
    affinity?: any
    enabled?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    includeService?: any
    maxHistory?: any
    nodeSelector?: any
    onlyListenOnLocalhost?: any
    replicaCount?: any
    resources?: any
    role?: {
      kind?: any
      name?: any
      type?: any
    }
    tls?: {
      ca?: any
      cert?: any
      enabled?: any
      key?: any
      secretName?: any
      verify?: any
    }
    tolerations?: any
  }
}

