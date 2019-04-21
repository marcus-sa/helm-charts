// Automatically generated

export interface ChartValues {
  global?: {
    container?: {
      adminSecret?: any
    }
    dataVolume?: {
      accessModes?: any
      existingClaimName?: any
      size?: any
      storageClassName?: any
    }
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    imageCredentials?: {
      dockerSecret?: any
    }
    persistence?: {
      enabled?: any
      useDynamicProvisioning?: any
    }
  }
  isamconfig?: {
    service?: {
      type?: any
    }
  }
  isamdsc?: {
    container?: {
      enabled?: any
      useReplica?: any
    }
  }
  isampostgresql?: {
    container?: {
      enabled?: any
    }
  }
  isamruntime?: {
    container?: {
      enabled?: any
    }
  }
  isamwrp?: {
    service?: {
      type?: any
    }
  }
}

