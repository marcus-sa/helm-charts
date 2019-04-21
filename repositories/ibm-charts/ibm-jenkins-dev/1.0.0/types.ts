// Automatically generated

export interface ChartValues {
  agent?: {
    image?: {
      repository?: any
      tag?: any
    }
    resourceConstraints?: {
      enabled?: any
    }
    resources?: {
      limits?: {
        cpu?: any
        memory?: any
      }
      requests?: {
        cpu?: any
        memory?: any
      }
    }
  }
  arch?: any
  homePVC?: {
    accessMode?: any
    existingClaimName?: any
    name?: any
    selector?: {
      label?: any
      value?: any
    }
    size?: any
    storageClassName?: any
  }
  master?: {
    adminPassword?: any
    adminUser?: any
    agentListenerPort?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    name?: any
    resourceConstraints?: {
      enabled?: any
    }
    resources?: any
    service?: {
      externalPort?: any
      internalPort?: any
      name?: any
      type?: any
    }
  }
  nameOverride?: any
  persistence?: {
    enabled?: any
    useDynamicProvisioning?: any
  }
  rbac?: {
    apiVersion?: any
    install?: any
    roleRef?: any
    serviceAccountName?: any
  }
}

