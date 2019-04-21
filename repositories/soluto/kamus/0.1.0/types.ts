// Automatically generated

export interface ChartValues {
  airbag?: {
    audience?: any
    authority?: any
    issuer?: any
    repository?: any
    tag?: any
  }
  autoscale?: {
    maxReplicas?: any
    minReplicas?: any
    targetCPU?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    version?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    tls?: {
      secretName?: any
    }
  }
  keyManagement?: {
    AES?: {
      key?: any
    }
    azureKeyVault?: {
      clientId?: any
      clientSecret?: any
      keySize?: any
      keyType?: any
      keyVaultName?: any
      maximumDataLength?: any
    }
    googleKms?: {
      credentials?: any
      keyRing?: any
      location?: any
      protectionLevel?: any
    }
    provider?: any
  }
  nameOverride?: any
  nodeSelector?: any
  replicaCount?: any
  resources?: any
  service?: {
    annotations?: any
    externalPort?: any
    internalPort?: any
    type?: any
  }
  useAirbag?: any
}

