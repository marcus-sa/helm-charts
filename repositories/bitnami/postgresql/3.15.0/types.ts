// Automatically generated

export interface ChartValues {
  configurationConfigMap?: any
  existingSecret?: any
  extendedConfConfigMap?: any
  extraEnv?: any
  fullnameOverride?: any
  global?: {
    imagePullSecrets?: any
    imageRegistry?: any
    postgresql?: {
      existingSecret?: any
      postgresqlDatabase?: any
      postgresqlPassword?: any
      postgresqlUsername?: any
      replicationPassword?: any
      replicationUser?: any
      servicePort?: any
    }
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
  initdbScriptsConfigMap?: any
  initdbScriptsSecret?: any
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
    podAnnotations?: any
    podLabels?: any
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
    livenessProbe?: {
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    readinessProbe?: {
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
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
  postgresqlDataDir?: any
  postgresqlDatabase?: any
  postgresqlExtendedConf?: any
  postgresqlInitdbArgs?: any
  postgresqlInitdbWalDir?: any
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
    applicationName?: any
    enabled?: any
    numSynchronousReplicas?: any
    password?: any
    slaveReplicas?: any
    synchronousCommit?: any
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
    clusterIP?: any
    loadBalancerIP?: any
    nodePort?: any
    port?: any
    type?: any
  }
  slave?: {
    affinity?: any
    nodeSelector?: any
    podAnnotations?: any
    podLabels?: any
    tolerations?: any
  }
  terminationGracePeriodSeconds?: any
  updateStrategy?: {
    type?: any
  }
  usePasswordFile?: any
  volumePermissions?: {
    enabled?: any
    image?: {
      pullPolicy?: any
      pullSecrets?: any
      registry?: any
      repository?: any
      tag?: any
    }
    securityContext?: {
      runAsUser?: any
    }
  }
}

