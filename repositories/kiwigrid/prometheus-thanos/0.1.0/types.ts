// Automatically generated

export interface ChartValues {
  fullnameOverride?: any
  nameOverride?: any
  querier?: {
    additionalFlags?: any
    affinity?: any
    cluster?: {
      disable?: any
    }
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    livenessProbe?: {
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    logLevel?: any
    nodeSelector?: any
    readinessProbe?: {
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    replicaCount?: any
    replicaLabel?: any
    resources?: any
    stores?: any
    tolerations?: any
  }
  service?: {
    querier?: {
      grpc?: {
        port?: any
      }
      http?: {
        port?: any
      }
      type?: any
    }
    storeGateway?: {
      grpc?: {
        port?: any
      }
      http?: {
        port?: any
      }
      type?: any
    }
  }
  storeGateway?: {
    additionalFlags?: any
    affinity?: any
    chunkPoolSize?: any
    cluster?: {
      disable?: any
    }
    extraEnv?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    indexCacheSize?: any
    livenessProbe?: {
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    logLevel?: any
    nodeSelector?: any
    objStoreConfig?: any
    objStoreType?: any
    readinessProbe?: {
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    replicaCount?: any
    resources?: any
    tolerations?: any
    volumeMounts?: any
    volumes?: any
  }
}

