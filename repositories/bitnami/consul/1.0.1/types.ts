// Automatically generated

export interface ChartValues {
  Resources?: any
  antiAffinity?: any
  configmap?: any
  consulDnsPort?: any
  datacenterName?: any
  domain?: any
  gossipKey?: any
  httpPort?: any
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    hosts?: any
  }
  livenessProbe?: {
    enabled?: any
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  localConfig?: any
  maxUnavailable?: any
  metrics?: {
    enabled?: any
    image?: {
      pullPolicy?: any
      registry?: any
      repository?: any
      tag?: any
    }
    resources?: any
  }
  nameOverride?: any
  nodeAffinity?: any
  persistence?: {
    accessModes?: any
    annotations?: any
    enabled?: any
    size?: any
    storageClass?: any
  }
  raftMultiplier?: any
  readinessProbe?: {
    enabled?: any
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  replicas?: any
  rpcPort?: any
  serflanPort?: any
  serverPort?: any
  tlsEncryptionSecretName?: any
  ui?: {
    ingress?: {
      enabled?: any
    }
    service?: {
      enabled?: any
      type?: any
    }
  }
}

