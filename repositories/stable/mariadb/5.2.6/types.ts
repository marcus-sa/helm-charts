// Automatically generated

export interface ChartValues {
  db?: {
    forcePassword?: any
    name?: any
    password?: any
    user?: any
  }
  global?: {
    imageRegistry?: any
  }
  image?: {
    debug?: any
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
    repository?: any
    tag?: any
  }
  master?: {
    affinity?: any
    annotations?: any
    antiAffinity?: any
    config?: any
    livenessProbe?: {
      enabled?: any
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    persistence?: {
      accessModes?: any
      enabled?: any
      existingClaim?: any
      mountPath?: any
      size?: any
      storageClass?: any
    }
    readinessProbe?: {
      enabled?: any
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    resources?: any
    tolerations?: any
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
    resources?: any
  }
  nameOverride?: any
  replication?: {
    enabled?: any
    forcePassword?: any
    password?: any
    user?: any
  }
  rootUser?: {
    existingSecret?: any
    forcePassword?: any
    password?: any
  }
  securityContext?: {
    enabled?: any
    fsGroup?: any
    runAsUser?: any
  }
  service?: {
    clusterIp?: any
    nodePort?: {
      master?: any
      slave?: any
    }
    port?: any
    type?: any
  }
  slave?: {
    affinity?: any
    annotations?: any
    antiAffinity?: any
    config?: any
    livenessProbe?: {
      enabled?: any
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    persistence?: {
      accessModes?: any
      enabled?: any
      size?: any
      storageClass?: any
    }
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
    tolerations?: any
  }
}

