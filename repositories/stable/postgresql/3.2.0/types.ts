// Automatically generated

export interface ChartValues {
  existingSecret?: any
  extraEnv?: any
  fullnameOverride?: any
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
  initdbScripts?: any
  livenessProbe?: {
    enabled?: any
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  master?: {
    affinity?: any
    nodeSelector?: any
    tolerations?: any
  }
  metrics?: {
    enabled?: any
    image?: {
      pullPolicy?: any
      pullSecrets?: any
      registry?: any
      repository?: any
      tag?: any
    }
    resources?: any
    service?: {
      annotations?: any
      loadBalancerIP?: any
      type?: any
    }
  }
  nameOverride?: any
  networkPolicy?: {
    allowExternal?: any
    enabled?: any
  }
  persistence?: {
    accessModes?: any
    annotations?: any
    enabled?: any
    existingClaim?: any
    mountPath?: any
    size?: any
    storageClass?: any
  }
  pgHbaConfiguration?: any
  postgresqlConfiguration?: any
  postgresqlDatabase?: any
  postgresqlPassword?: any
  postgresqlUsername?: any
  readinessProbe?: {
    enabled?: any
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  replication?: {
    enabled?: any
    password?: any
    slaveReplicas?: any
    user?: any
  }
  resources?: any
  securityContext?: {
    enabled?: any
    fsGroup?: any
    runAsUser?: any
  }
  service?: {
    annotations?: any
    loadBalancerIP?: any
    nodePort?: any
    port?: any
    type?: any
  }
  slave?: {
    affinity?: any
    nodeSelector?: any
    tolerations?: any
  }
  terminationGracePeriodSeconds?: any
  updateStrategy?: {
    type?: any
  }
  usePasswordFile?: any
  volumePermissions?: {
    image?: {
      pullPolicy?: any
      registry?: any
      repository?: any
      tag?: any
    }
    securityContext?: {
      runAsUser?: any
    }
  }
}

