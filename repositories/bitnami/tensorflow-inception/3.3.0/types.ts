// Automatically generated

export interface ChartValues {
  client?: {
    image?: {
      pullPolicy?: any
      pullSecrets?: any
      registry?: any
      repository?: any
      tag?: any
    }
  }
  global?: {
    imagePullSecrets?: any
    imageRegistry?: any
  }
  metrics?: {
    enabled?: any
    image?: {
      pullPolicy?: any
      pullSecrets?: any
      registry?: any
      repository?: any
      tag?: any
    }
    podAnnotations?: any
    resources?: any
  }
  nameOverride?: any
  podAnnotations?: any
  replicaCount?: any
  securityContext?: {
    enabled?: any
    fsGroup?: any
    runAsUser?: any
  }
  server?: {
    image?: {
      pullPolicy?: any
      pullSecrets?: any
      registry?: any
      repository?: any
      tag?: any
    }
    port?: any
  }
  serviceType?: any
}

