// Automatically generated

export interface ChartValues {
  affinity?: any
  backend?: any
  canary?: {
    analysis?: {
      interval?: any
      maxWeight?: any
      stepWeight?: any
      threshold?: any
    }
    enabled?: any
    istioIngress?: {
      enabled?: any
      gateway?: any
      host?: any
    }
    loadtest?: {
      enabled?: any
      url?: any
    }
    thresholds?: {
      latency?: any
      successRate?: any
    }
  }
  faults?: {
    delay?: any
    error?: any
  }
  fullnameOverride?: any
  hpa?: {
    cpu?: any
    enabled?: any
    maxReplicas?: any
    memory?: any
    minReplicas?: any
    requests?: any
  }
  httpServer?: {
    timeout?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  logLevel?: any
  message?: any
  nameOverride?: any
  nodeSelector?: any
  resources?: any
  service?: {
    port?: any
    type?: any
  }
  tolerations?: any
}

