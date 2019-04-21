// Automatically generated

export interface ChartValues {
  agones?: {
    controller?: {
      generateTLS?: any
      healthCheck?: {
        failureThreshold?: any
        http?: {
          port?: any
        }
        initialDelaySeconds?: any
        periodSeconds?: any
        timeoutSeconds?: any
      }
      resources?: any
    }
    image?: {
      controller?: {
        name?: any
        pullPolicy?: any
        pullSecret?: any
      }
      registry?: any
      sdk?: {
        alwaysPull?: any
        name?: any
      }
      tag?: any
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

