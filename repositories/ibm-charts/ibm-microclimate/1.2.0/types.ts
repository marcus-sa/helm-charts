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
    Memory?: any
    NodeSelector?: any
    Privileged?: any
    volumes?: any
  }
  Master?: {
    CredentialsXmlSecret?: any
    HostName?: any
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
  arch?: any
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
  gitlab?: {
    apiToken?: any
    url?: any
  }
  global?: {
    helm?: {
      tlsSecretName?: any
    }
  }
  hostName?: any
  imagePullPolicy?: any
  jenkins?: {
    Master?: {
      AdminPassword?: any
      AdminUser?: any
      HostName?: any
      LoginOpenIdConnect?: any
      UseSecurity?: any
    }
    Pipeline?: {
      Registry?: {
        Secret?: any
        Url?: any
      }
    }
  }
  jmeter?: {
    repository?: any
    tag?: any
  }
  nodeSelector?: any
  persistence?: {
    enabled?: any
    existingClaimName?: any
    size?: any
    storageClassName?: any
    useDynamicProvisioning?: any
  }
  portal?: {
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
  ports?: {
    filewatcher?: any
    portal?: any
    theia?: any
  }
  replicaCount?: any
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
}

