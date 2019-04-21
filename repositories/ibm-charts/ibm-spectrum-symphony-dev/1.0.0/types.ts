// Automatically generated

export interface ChartValues {
  arch?: any
  client?: {
    enabled?: any
    resources?: any
    sshdPort?: any
  }
  cluster?: {
    clusterName?: any
    enableSSHD?: any
    generateClusterAdminPassword?: any
    productVersion?: any
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
  }
  compute?: {
    maxReplicas?: any
    minReplicas?: any
    replicaCount?: any
    resources?: any
    targetCPUUtilizationPercentage?: any
    usePodAutoscaler?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  master?: {
    egoRestEnabled?: any
    logsOnShared?: any
    regenSSLCert?: any
    replicaCount?: any
    resources?: any
    symRestEnabled?: any
    uiEnabled?: any
  }
  nameOverride?: any
}

