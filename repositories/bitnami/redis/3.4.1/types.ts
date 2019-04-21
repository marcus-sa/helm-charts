// Automatically generated

export interface ChartValues {
  affinity?: any
  args?: any
  cluster?: {
    enabled?: any
    slaveCount?: any
  }
  existingSecret?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
    repository?: any
    tag?: any
  }
  imagePullPolicy?: any
  master?: {
    args?: any
    disableCommands?: any
    extraFlags?: any
    livenessProbe?: {
      enabled?: any
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    nodeSelector?: any
    persistence?: {
      accessModes?: any
      enabled?: any
      path?: any
      size?: any
      storageClass?: any
      subPath?: any
    }
    podAnnotations?: any
    podLabels?: any
    port?: any
    readinessProbe?: {
      enabled?: any
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    resources?: any
    schedulerName?: any
    securityContext?: {
      enabled?: any
      fsGroup?: any
      runAsUser?: any
    }
    service?: {
      annotations?: any
      loadBalancerIP?: any
      nodePort?: any
      type?: any
    }
    tolerations?: any
  }
  metrics?: {
    annotations?: any
    enabled?: any
    image?: {
      pullPolicy?: any
      pullSecrets?: any
      registry?: any
      repository?: any
      tag?: any
    }
    imagePullPolicy?: any
    imageTag?: any
    nodeSelector?: any
    podAnnotations?: any
    podLabels?: any
    resources?: any
    service?: {
      annotations?: any
      loadBalancerIP?: any
      type?: any
    }
    tolerations?: any
  }
  nameOverride?: any
  networkPolicy?: {
    allowExternal?: any
    enabled?: any
  }
  nodeSelector?: any
  password?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    path?: any
    size?: any
    storageClass?: any
    subPath?: any
  }
  podAnnotations?: any
  podLabels?: any
  rbac?: {
    create?: any
    role?: {
      rules?: any
    }
  }
  redisDisableCommands?: any
  resources?: any
  securityContext?: {
    enabled?: any
    fsGroup?: any
    runAsUser?: any
  }
  service?: {
    annotations?: any
    loadBalancerIP?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  serviceType?: any
  slave?: {
    args?: any
    disableCommands?: any
    extraFlags?: any
    livenessProbe?: any
    nodeSelector?: any
    podAnnotations?: any
    podLabels?: any
    port?: any
    readinessProbe?: any
    resources?: any
    schedulerName?: any
    securityContext?: any
    service?: {
      annotations?: any
      loadBalancerIP?: any
      type?: any
    }
    tolerations?: any
  }
  tolerations?: any
  usePassword?: any
}

