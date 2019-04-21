// Automatically generated

export interface ChartValues {
  affinity?: any
  auth?: {
    existingAdminSecret?: any
    existingKeySecret?: any
  }
  clusterDomain?: any
  configmap?: any
  existingSecret?: any
  extraInitContainers?: any
  fullnameOverride?: any
  global?: {
    imagePullSecrets?: any
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
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    paths?: any
    tls?: any
  }
  initConfigMap?: {
    name?: any
  }
  livenessProbe?: {
    enabled?: any
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  metrics?: {
    enabled?: any
    extraArgs?: any
    image?: {
      pullPolicy?: any
      pullSecrets?: any
      registry?: any
      repository?: any
      tag?: any
    }
    livenessProbe?: {
      enabled?: any
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    podAnnotations?: any
    readinessProbe?: {
      enabled?: any
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    resources?: any
    serviceMonitor?: {
      additionalLabels?: any
      alerting?: {
        additionalLabels?: any
        rules?: any
      }
      enabled?: any
      relabellings?: any
    }
  }
  mongodbDatabase?: any
  mongodbDirectoryPerDB?: any
  mongodbDisableSystemLog?: any
  mongodbEnableIPv6?: any
  mongodbExtraFlags?: any
  mongodbPassword?: any
  mongodbRootPassword?: any
  mongodbSystemLogVerbosity?: any
  mongodbUsername?: any
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    accessModes?: any
    annotations?: any
    enabled?: any
    existingClaim?: any
    mountPath?: any
    size?: any
    storageClass?: any
    subPath?: any
  }
  podAnnotations?: any
  podLabels?: any
  priorityClassName?: any
  readinessProbe?: {
    enabled?: any
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  replicaSet?: {
    enabled?: any
    key?: any
    name?: any
    pdb?: {
      minAvailable?: {
        arbiter?: any
        primary?: any
        secondary?: any
      }
    }
    replicas?: {
      arbiter?: any
      secondary?: any
    }
    useHostnames?: any
  }
  resources?: any
  securityContext?: {
    enabled?: any
    fsGroup?: any
    runAsUser?: any
  }
  service?: {
    annotations?: any
    clusterIP?: any
    loadBalancerIP?: any
    nodePort?: any
    port?: any
    type?: any
  }
  tolerations?: any
  updateStrategy?: {
    type?: any
  }
  usePassword?: any
}

