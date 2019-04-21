// Automatically generated

export interface ChartValues {
  analyzer?: {
    topology?: {
      fabric?: any
    }
  }
  arch?: any
  dataVolume?: {
    existingClaimName?: any
    name?: any
    size?: any
    storageClassName?: any
  }
  elasticsearch?: {
    image?: {
      repository?: any
      tag?: any
    }
  }
  env?: any
  image?: {
    imagePullPolicy?: any
    repository?: any
    secretName?: any
    tag?: any
  }
  nameOverride?: any
  persistence?: {
    enabled?: any
    useDynamicProvisioning?: any
  }
  resources?: any
  service?: {
    name?: any
    port?: any
    type?: any
  }
  storage?: {
    elasticsearch?: {
      host?: any
    }
    flows?: {
      indexEntriesLimit?: any
      indicesToKeep?: any
    }
    topology?: {
      indexEntriesLimit?: any
      indicesToKeep?: any
    }
  }
}

