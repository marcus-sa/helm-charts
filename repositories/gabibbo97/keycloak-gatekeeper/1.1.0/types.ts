// Automatically generated

export interface ChartValues {
  ClientID?: any
  ClientSecret?: any
  addClaims?: any
  affinity?: any
  debug?: any
  discoveryURL?: any
  encryptionKey?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    path?: any
    tls?: any
  }
  matchClaims?: any
  nameOverride?: any
  nodeSelector?: any
  prometheusMetrics?: any
  rbac?: {
    create?: any
  }
  replicaCount?: any
  resources?: any
  rules?: any
  scopes?: any
  service?: {
    port?: any
    type?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  skipUpstreamTlsVerify?: any
  tolerations?: any
  upstreamURL?: any
}

