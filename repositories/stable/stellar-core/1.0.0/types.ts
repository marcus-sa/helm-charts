// Automatically generated

export interface ChartValues {
  affinity?: any
  catchupComplete?: any
  catchupRecent?: any
  environment?: any
  existingDatabase?: {
    passwordSecret?: any
    url?: any
  }
  existingNodeSeedSecret?: any
  fullnameOverride?: any
  gcloudServiceAccountKey?: any
  history?: any
  httpService?: {
    port?: any
    type?: any
  }
  image?: {
    flavor?: any
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  initializeHistoryArchives?: any
  knownPeers?: any
  maxPeerConnections?: any
  nameOverride?: any
  networkPassphrase?: any
  nodeIsValidator?: any
  nodeNames?: any
  nodeSeed?: any
  nodeSelector?: any
  peerService?: {
    externalTrafficPolicy?: any
    loadBalancerIP?: any
    port?: any
    type?: any
  }
  persistence?: {
    accessMode?: any
    annotations?: any
    enabled?: any
    existingClaim?: any
    mountPath?: any
    size?: any
    storageClass?: any
    subPath?: any
  }
  postgresql?: {
    enabled?: any
    fullnameOverride?: any
    nameOverride?: any
    postgresDatabase?: any
    postgresUser?: any
  }
  postgresqlConnectTimeout?: any
  preferredPeers?: any
  quorumSet?: any
  resources?: any
  serviceAccount?: {
    create?: any
    name?: any
  }
  tolerations?: any
}

