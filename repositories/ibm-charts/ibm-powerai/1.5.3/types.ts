// Automatically generated

export interface ChartValues {
  command?: any
  ddl?: {
    enabled?: any
    gpuPerHost?: any
    sshKeySecret?: any
    sshPort?: any
    useHostNetwork?: any
    useInfiniBand?: any
  }
  global?: {
    image?: {
      secretName?: any
    }
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  license?: any
  nameOverride?: any
  persistence?: {
    enabled?: any
    useDynamicProvisioning?: any
  }
  poweraiPVC?: {
    accessMode?: any
    existingClaimName?: any
    name?: any
    size?: any
    storageClassName?: any
  }
  resources?: {
    gpu?: any
    gputype?: any
  }
  service?: {
    port?: any
    type?: any
  }
}

