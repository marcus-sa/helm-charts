// Automatically generated

export interface ChartValues {
  arch?: any
  cluster?: {
    dashboard?: {
      enabled?: any
    }
    dataDirHostPath?: any
    mon?: {
      allowMultiplePerNode?: any
      count?: any
    }
    network?: {
      hostNetwork?: any
    }
    placement?: {
      all?: {
        enabled?: any
        nodeSelectorTerms?: any
        tolerations?: any
      }
      mgr?: {
        enabled?: any
        nodeSelectorTerms?: any
        tolerations?: any
      }
      mon?: {
        enabled?: any
        nodeSelectorTerms?: any
        tolerations?: any
      }
      osd?: {
        enabled?: any
        nodeSelectorTerms?: any
        tolerations?: any
      }
    }
    resources?: any
    storage?: {
      config?: {
        databaseSizeMB?: any
        journalSizeMB?: any
        storeType?: any
      }
      deviceFilter?: any
      location?: any
      nodes?: any
      useAllDevices?: any
      useAllNodes?: any
    }
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  pool?: {
    erasureCoded?: {
      codingChunks?: any
      dataChunks?: any
    }
    failureDomain?: any
    replicated?: {
      size?: any
    }
    resilienceType?: any
  }
  preValidation?: {
    enabled?: any
  }
  rookOperatorNamespace?: any
  storageClass?: {
    create?: any
    fsType?: any
    name?: any
    reclaimPolicy?: any
    volumeBindingMode?: any
  }
}

