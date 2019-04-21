// Automatically generated

export interface ChartValues {
  Agent?: {
    AlwaysPullImage?: any
    Component?: any
    Cpu?: any
    Enabled?: any
    Image?: any
    ImagePullSecret?: any
    ImageTag?: any
    JnlpContainer?: {
      JVM?: {
        MaxHeapSize?: any
      }
    }
    Memory?: any
    NodeSelector?: any
    Privileged?: any
    volumes?: any
  }
  Master?: {
    CredentialsXmlSecret?: any
    ImageTag?: any
    InitScripts?: any
    InstallPlugins?: any
    JenkinsUriPrefix?: any
    Jobs?: any
    LoginOpenIdConnect?: any
    ScriptApproval?: any
    SecretsFilesSecret?: any
    ServicePort?: any
    UseSecurity?: any
  }
  Pipeline?: {
    Build?: any
    Debug?: any
    Deploy?: any
    DeployBranch?: any
    Registry?: {
      Secret?: any
      Url?: any
    }
    TargetNamespace?: any
    Template?: {
      RepositoryUrl?: any
      Version?: any
    }
    Test?: any
  }
  atrium?: {
    repository?: any
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
    tag?: any
  }
  beacon?: {
    repository?: any
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
    tag?: any
  }
  curl?: {
    repository?: any
    tag?: any
  }
  devops?: {
    pullPolicy?: any
    repository?: any
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
    tag?: any
  }
  filewatcher?: {
    repository?: any
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
    tag?: any
  }
  global?: {
    additionalImagePullSecrets?: any
    applyPodSecurityPolicy?: any
    arch?: any
    helm?: {
      tlsSecretName?: any
    }
    ingressDomain?: any
    jenkinsHost?: any
    microclimateHost?: any
    rbac?: {
      serviceAccountName?: any
    }
  }
  imagePullPolicy?: any
  jenkins?: {
    Master?: {
      AdminUser?: any
      LoginOpenIdConnect?: any
      UseSecurity?: any
    }
    Pipeline?: {
      Registry?: {
        Secret?: any
        Url?: any
      }
      TargetNamespace?: any
    }
    rbac?: {
      serviceAccountName?: any
    }
  }
  kubectl?: {
    repository?: any
    tag?: any
  }
  loadrunner?: {
    repository?: any
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
    tag?: any
  }
  persistence?: {
    enabled?: any
    existingClaimName?: any
    size?: any
    storageClassName?: any
    useDynamicProvisioning?: any
  }
  portal?: {
    clock?: {
      tolerance?: any
    }
    repository?: any
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
    tag?: any
  }
  rbac?: {
    serviceAccountName?: any
  }
  theia?: {
    repository?: any
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
    tag?: any
  }
  utils?: {
    repository?: any
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
    tag?: any
  }
}

