// Automatically generated

export interface ChartValues {
  config?: any
  coordinating?: {
    antiAffinity?: any
    heapSize?: any
    livenessProbe?: {
      enabled?: any
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    name?: any
    nodeAffinity?: any
    readinessProbe?: {
      enabled?: any
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    replicas?: any
    resources?: any
    service?: {
      annotations?: any
      loadBalancerIP?: any
      nodePort?: any
      port?: any
      type?: any
    }
  }
  data?: {
    antiAffinity?: any
    heapSize?: any
    livenessProbe?: {
      enabled?: any
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    name?: any
    nodeAffinity?: any
    persistence?: {
      accessModes?: any
      annotations?: any
      enabled?: any
      size?: any
      storageClass?: any
    }
    readinessProbe?: {
      enabled?: any
    }
    replicas?: any
    resources?: any
  }
  discovery?: {
    name?: any
  }
  global?: {
    imageRegistry?: any
  }
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
    repository?: any
    tag?: any
  }
  ingest?: {
    antiAffinity?: any
    enabled?: any
    heapSize?: any
    livenessProbe?: {
      enabled?: any
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    name?: any
    nodeAffinity?: any
    readinessProbe?: {
      enabled?: any
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    replicas?: any
    resources?: any
    service?: {
      annotations?: any
      loadBalancerIP?: any
      nodePort?: any
      port?: any
      type?: any
    }
  }
  master?: {
    antiAffinity?: any
    heapSize?: any
    livenessProbe?: {
      enabled?: any
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    name?: any
    nodeAffinity?: any
    readinessProbe?: {
      enabled?: any
    }
    replicas?: any
    resources?: any
    service?: {
      annotations?: any
      loadBalancerIP?: any
      nodePort?: any
      port?: any
      type?: any
    }
  }
  metrics?: {
    annotations?: any
    enabled?: any
    image?: {
      pullPolicy?: any
      registry?: any
      repository?: any
      tag?: any
    }
    name?: any
    resources?: any
    service?: {
      type?: any
    }
  }
  name?: any
  nameOverride?: any
  plugins?: any
  securityContext?: {
    enabled?: any
    fsGroup?: any
    runAsUser?: any
  }
  sysctlImage?: {
    enabled?: any
    registry?: any
    repository?: any
    tag?: any
  }
}

