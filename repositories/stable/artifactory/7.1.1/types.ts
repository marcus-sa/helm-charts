// Automatically generated

export interface ChartValues {
  artifactory?: {
    externalPort?: any
    image?: {
      pullPolicy?: any
      repository?: any
      version?: any
    }
    internalPort?: any
    javaOpts?: {
      other?: any
      xms?: any
      xmx?: any
    }
    name?: any
    persistence?: {
      ExistingClaim?: any
      accessMode?: any
      enabled?: any
      existingClaim?: any
      mountPath?: any
      size?: any
      storageClass?: any
    }
    replicaCount?: any
    resources?: any
    service?: {
      annotations?: any
      type?: any
    }
  }
  imagePullSecrets?: any
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    tls?: any
  }
  initContainerImage?: any
  nameOverride?: any
  nginx?: {
    enabled?: any
    env?: {
      artUrl?: any
      ssl?: any
    }
    externalPortHttp?: any
    externalPortHttps?: any
    image?: {
      pullPolicy?: any
      repository?: any
      version?: any
    }
    internalPortHttp?: any
    internalPortHttps?: any
    name?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      existingClaim?: any
      mountPath?: any
      size?: any
      storageClass?: any
    }
    replicaCount?: any
    resources?: any
    service?: {
      annotations?: any
      loadBalancerIP?: any
      loadBalancerSourceRanges?: any
      type?: any
    }
    tlsSecretName?: any
  }
  postgresql?: {
    postgresUser?: any
    service?: {
      port?: any
    }
  }
}

