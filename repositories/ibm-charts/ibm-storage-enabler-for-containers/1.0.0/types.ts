// Automatically generated

export interface ChartValues {
  backend?: any
  customPodSecurityPolicy?: {
    clusterRole?: any
    enabled?: any
  }
  fullnameOverride?: any
  globalConfig?: {
    imagePullSecret?: any
    logLevel?: any
    sslMode?: any
  }
  helmTestOverride?: any
  nameOverride?: any
  spectrumConnect?: {
    backendConfig?: {
      defaultStorageService?: any
      instanceName?: any
      newVolumeDefaults?: {
        fsType?: any
        size?: any
      }
    }
    connectionInfo?: {
      existingSecret?: any
      fqdn?: any
      port?: any
    }
    storageClass?: {
      fsType?: any
      storageService?: any
    }
  }
  spectrumScale?: {
    backendConfig?: {
      defaultFilesystemName?: any
    }
    connectionInfo?: {
      existingSecret?: any
      fqdn?: any
      port?: any
    }
  }
  ubiquity?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    resources?: any
  }
  ubiquityDb?: {
    dbCredentials?: {
      existingSecret?: any
    }
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    nodeSelector?: any
    persistence?: {
      pvName?: any
      pvSize?: any
      storageClass?: {
        defaultClass?: any
        existingStorageClass?: any
        storageClassName?: any
      }
      useExistingPv?: any
    }
    resources?: any
  }
  ubiquityHelmUtils?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
  }
  ubiquityK8sFlex?: {
    flexLogDir?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    resources?: any
    tolerations?: any
  }
  ubiquityK8sFlexInitContainer?: {
    resources?: any
  }
  ubiquityK8sFlexSidecar?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    resources?: any
  }
  ubiquityK8sProvisioner?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    resources?: any
  }
}

