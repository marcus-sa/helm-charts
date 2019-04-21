// Automatically generated

export interface ChartValues {
  agones?: {
    controller?: {
      affinity?: any
      apiServerQPS?: any
      apiServerQPSBurst?: any
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
      nodeSelector?: any
      numWorkers?: any
      resources?: any
      safeToEvict?: any
      tolerations?: any
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
      prometheusEnabled?: any
      prometheusServiceDiscovery?: any
      stackdriverEnabled?: any
      stackdriverProjectID?: any
    }
    ping?: {
      affinity?: any
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
      nodeSelector?: any
      replicas?: any
      resources?: any
      tolerations?: any
      udp?: {
        expose?: any
        port?: any
        rateLimit?: any
        serviceType?: any
      }
    }
    priorityClassName?: any
    rbacEnabled?: any
    registerServiceAccounts?: any
    registerWebhooks?: any
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

