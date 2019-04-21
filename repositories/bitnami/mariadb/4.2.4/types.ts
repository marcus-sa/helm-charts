// Automatically generated

export interface ChartValues {
  config?: any
  db?: {
    forcePassword?: any
    name?: any
    password?: any
    user?: any
  }
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
    repository?: any
    tag?: any
  }
  imagePullPolicy?: any
  mariadbDatabase?: any
  mariadbUser?: any
  master?: {
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
    resources?: any
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
    imagePullPolicy?: any
    imageTag?: any
    resources?: any
  }
  nameOverride?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
  }
  replication?: {
    enabled?: any
    forcePassword?: any
    password?: any
    user?: any
  }
  resources?: any
  rootUser?: {
    existingSecret?: any
    forcePassword?: any
    password?: any
  }
  securitySettings?: {
    enabled?: any
    fsGroup?: any
    runAsUser?: any
  }
  service?: {
    annotations?: any
    nodePort?: any
    port?: any
    type?: any
  }
  slave?: {
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
  }
  usePassword?: any
}

