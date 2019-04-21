// Automatically generated

export interface ChartValues {
  Resources?: any
  antiAffinity?: any
  configmap?: any
  datacenterName?: any
  domain?: any
  global?: {
    imageRegistry?: any
  }
  gossipKey?: any
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
    podAnnotations?: any
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
  podAnnotations?: any
  port?: any
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
  securityContext?: {
    enabled?: any
    fsGroup?: any
    runAsUser?: any
  }
  service?: {
    consulDnsPort?: any
    port?: any
    rpcPort?: any
    serflanPort?: any
    serverPort?: any
    uiPort?: any
  }
  tlsEncryptionSecretName?: any
  ui?: {
    ingress?: {
      enabled?: any
    }
    service?: {
      annotations?: any
      enabled?: any
      loadBalancerIP?: any
      type?: any
    }
  }
}

