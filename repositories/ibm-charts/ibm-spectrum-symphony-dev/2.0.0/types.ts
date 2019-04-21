// Automatically generated

export interface ChartValues {
  client?: {
    enabled?: any
    resources?: any
  }
  cluster?: {
    clusterName?: any
    enableSSHD?: any
    enableSharedSubdir?: any
    logsOnShared?: any
    pvc?: {
      existingClaimName?: any
      selector?: {
        label?: any
        value?: any
      }
      size?: any
      storageClassName?: any
      useDynamicProvisioning?: any
    }
    scriptsSecretName?: any
    sshKeysSecretName?: any
  }
  compute?: {
    maxReplicas?: any
    minReplicas?: any
    replicaCount?: any
    resources?: any
    targetCPUUtilizationPercentage?: any
    usePodAutoscaler?: any
  }
  helmTestOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  master?: {
    egoRestEnabled?: any
    entitlementSecretName?: any
    resources?: any
    symRestEnabled?: any
    uiEnabled?: any
  }
}

