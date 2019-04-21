// Automatically generated

export interface ChartValues {
  affinity?: any
  fullnameOverride?: any
  image?: {
    digest?: any
    pullPolicy?: any
    pullSecrets?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    labels?: any
    tls?: any
  }
  livenessProbe?: {
    enabled?: any
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
  readinessProbe?: {
    enabled?: any
  }
  resources?: any
  satisfy?: {
    homepage?: any
    repoName?: any
    sshPrivateKey?: any
  }
  service?: {
    port?: any
    type?: any
  }
  terminationGracePeriodSeconds?: any
  tolerations?: any
}

