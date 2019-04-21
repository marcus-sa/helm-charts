// Automatically generated

export interface ChartValues {
  arch?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  master?: {
    livenessProbe?: {
      enabled?: any
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    readinessProbe?: {
      enabled?: any
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
  }
  nameOverride?: any
  rbac?: {
    create?: any
  }
  replicas?: {
    sentinels?: any
    servers?: any
  }
  resources?: {
    sentinel?: any
    server?: any
  }
  sentinel?: {
    livenessProbe?: {
      enabled?: any
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    readinessProbe?: {
      enabled?: any
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
  }
  serverService?: {
    type?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
}

