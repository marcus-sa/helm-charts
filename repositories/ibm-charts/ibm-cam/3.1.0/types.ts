// Automatically generated

export interface ChartValues {
  arch?: any
  auditService?: {
    config?: {
      journalPath?: any
    }
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    resources?: any
  }
  camAPI?: {
    camSecret?: {
      secretName?: any
    }
    replicaCount?: any
  }
  camBPDAppDataPV?: {
    name?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      existingClaimName?: any
      size?: any
      storageClassName?: any
      useDynamicProvisioning?: any
    }
  }
  camBPDCDS?: {
    options?: {
      customSettingsFile?: any
      debug?: {
        enabled?: any
      }
    }
    replicaCount?: any
    resources?: any
  }
  camBPDDatabase?: {
    bundled?: any
    resources?: any
  }
  camBPDExternalDatabase?: {
    extlibPV?: {
      existingClaimName?: any
    }
    name?: any
    port?: any
    secret?: any
    type?: any
    url?: any
  }
  camBPDMDS?: {
    replicaCount?: any
    resources?: any
  }
  camBPDResources?: any
  camBPDUI?: {
    bundled?: any
  }
  camBroker?: {
    replicaCount?: any
  }
  camLogsPV?: {
    name?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      existingClaimName?: any
      size?: any
      storageClassName?: any
      useDynamicProvisioning?: any
    }
  }
  camMongoPV?: {
    name?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      existingClaimName?: any
      size?: any
      storageClassName?: any
      useDynamicProvisioning?: any
    }
  }
  camProxy?: {
    replicaCount?: any
  }
  camTerraformPV?: {
    name?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      existingClaimName?: any
      size?: any
      storageClassName?: any
      useDynamicProvisioning?: any
    }
  }
  camUI?: {
    camUISecret?: {
      secretName?: any
      sessionKey?: any
    }
    replicaCount?: any
  }
  database?: {
    bundled?: any
  }
  global?: {
    audit?: any
    iam?: {
      deployApiKey?: any
    }
    id?: {
      productID?: any
    }
    image?: {
      secretName?: any
    }
    offline?: any
  }
  image?: {
    dockerconfig?: any
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  managementConsole?: {
    port?: any
  }
  nameOverride?: any
  proxy?: {
    useProxy?: any
  }
  redis?: {
    bundled?: any
    host?: any
    port?: any
  }
  resources?: any
  secureValues?: {
    secretName?: any
  }
  service?: {
    namespace?: any
  }
}

