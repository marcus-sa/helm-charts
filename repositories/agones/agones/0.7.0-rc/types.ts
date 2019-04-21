// Automatically generated

export interface ChartValues {
  agones?: {
    controller?: {
      generateTLS?: any
      healthCheck?: {
        failureThreshold?: any
        initialDelaySeconds?: any
        periodSeconds?: any
        timeoutSeconds?: any
      }
      http?: {
        port?: any
      }
      resources?: any
      safeToEvict?: any
    }
    crds?: {
      cleanupOnDelete?: any
      install?: any
    }
    image?: {
      controller?: {
        name?: any
        pullPolicy?: any
        pullSecret?: any
      }
      ping?: {
        name?: any
        pullPolicy?: any
      }
      registry?: any
      sdk?: {
        alwaysPull?: any
        cpuLimit?: any
        cpuRequest?: any
        name?: any
      }
      tag?: any
    }
    metrics?: {
      enabled?: any
      prometheusServiceDiscovery?: any
    }
    ping?: {
      healthCheck?: {
        failureThreshold?: any
        initialDelaySeconds?: any
        periodSeconds?: any
        timeoutSeconds?: any
      }
      http?: {
        expose?: any
        port?: any
        response?: any
        serviceType?: any
      }
      install?: any
      replicas?: any
      udp?: {
        expose?: any
        port?: any
        rateLimit?: any
        serviceType?: any
      }
    }
    rbacEnabled?: any
    serviceaccount?: {
      controller?: any
      sdk?: any
    }
  }
  fullnameOverride?: any
  gameservers?: {
    maxPort?: any
    minPort?: any
    namespaces?: any
  }
  nameOverride?: any
}

