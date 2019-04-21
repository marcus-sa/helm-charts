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
    ImageTag?: any
    InitScripts?: any
    InstallPlugins?: any
    JenkinsUriPrefix?: any
    Jobs?: any
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
    tag?: any
  }
  filewatcher?: {
    repository?: any
    resources?: {
      cpuLimit?: any
      cpuRequest?: any
      memLimit?: any
      memRequest?: any
    }
    tag?: any
  }
  imagePullPolicy?: any
  jenkins?: {
    Master?: {
      AdminPassword?: any
      AdminUser?: any
      HostName?: any
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
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    enabled?: any
    size?: any
    storageClassName?: any
    useDynamicProvisioning?: any
  }
  portal?: {
    repository?: any
    resources?: {
      cpuLimit?: any
      cpuRequest?: any
      memLimit?: any
      memRequest?: any
    }
    tag?: any
  }
  ports?: {
    filewatcher?: any
    portal?: any
    theia?: any
  }
  replicaCount?: any
  service?: {
    externalPort?: any
    internalPort?: any
    name?: any
  }
  theia?: {
    repository?: any
    resources?: {
      cpuLimit?: any
      cpuRequest?: any
      memLimit?: any
      memRequest?: any
    }
    tag?: any
  }
}

