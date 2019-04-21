// Automatically generated

export interface ChartValues {
  Agent?: {
    AlwaysPullImage?: any
    Args?: any
    Command?: any
    Component?: any
    ContainerCap?: any
    Cpu?: any
    CustomJenkinsLabels?: any
    Enabled?: any
    Image?: any
    ImagePullSecret?: any
    ImageTag?: any
    Memory?: any
    NodeSelector?: any
    PodName?: any
    PodRetention?: any
    Privileged?: any
    SideContainerName?: any
    TTYEnabled?: any
    envVars?: any
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
    volumes?: any
  }
  Master?: {
    AdditionalConfig?: any
    AdminPassword?: any
    AdminSshKey?: any
    AdminUser?: any
    Affinity?: any
    AuthorizationStrategy?: any
    CLI?: any
    CSRF?: {
      DefaultCrumbIssuer?: {
        Enabled?: any
        ProxyCompatability?: any
      }
    }
    Component?: any
    ContainerEnv?: any
    Cpu?: any
    CredentialsXmlSecret?: any
    CustomConfigMap?: any
    DeploymentLabels?: any
    DisabledAgentProtocols?: any
    EnableRawHtmlMarkupFormatter?: any
    ExtraPorts?: any
    FsGroup?: any
    HealthProbeLivenessFailureThreshold?: any
    HealthProbeReadinessPeriodSeconds?: any
    HealthProbes?: any
    HealthProbesLivenessTimeout?: any
    HealthProbesReadinessTimeout?: any
    HostAliases?: any
    HostName?: any
    HostNetworking?: any
    Image?: any
    ImagePullPolicy?: any
    ImagePullSecret?: any
    ImageTag?: any
    InitContainerEnv?: any
    InitScripts?: any
    InstallPlugins?: any
    JCasC?: {
      ConfigScripts?: any
      PluginVersion?: any
      SupportPluginVersion?: any
      enabled?: any
    }
    JMXPort?: any
    JavaOpts?: any
    JenkinsAdminEmail?: any
    JenkinsOpts?: any
    JenkinsUriPrefix?: any
    JenkinsUrl?: any
    Jobs?: any
    LoadBalancerIP?: any
    LoadBalancerSourceRanges?: any
    Memory?: any
    Name?: any
    NodePort?: any
    NodeSelector?: any
    NumExecutors?: any
    OverwriteConfig?: any
    OverwritePlugins?: any
    PodAnnotations?: any
    PodLabels?: any
    RollingUpdate?: any
    RunAsUser?: any
    ScriptApproval?: any
    SecretsFilesSecret?: any
    SecurityRealm?: any
    ServiceAnnotations?: any
    ServiceLabels?: any
    ServicePort?: any
    ServiceType?: any
    Sidecars?: {
      configAutoReload?: {
        enabled?: any
        folder?: any
        image?: any
        imagePullPolicy?: any
        label?: any
        resources?: any
        searchNamespace?: any
        sshTcpPort?: any
      }
      other?: any
    }
    SlaveHostPort?: any
    SlaveKubernetesNamespace?: any
    SlaveListenerPort?: any
    SlaveListenerServiceAnnotations?: any
    SlaveListenerServiceType?: any
    Tolerations?: any
    UsePodSecurityContext?: any
    UseSecurity?: any
    ingress?: {
      annotations?: any
      apiVersion?: any
      enabled?: any
      hostName?: any
      labels?: any
      path?: any
      tls?: any
    }
    overwriteJobs?: any
    resources?: any
  }
  NetworkPolicy?: {
    ApiVersion?: any
    Enabled?: any
  }
  Persistence?: {
    AccessMode?: any
    Annotations?: any
    Enabled?: any
    ExistingClaim?: any
    Size?: any
    StorageClass?: any
    SubPath?: any
    mounts?: any
    volumes?: any
  }
  backup?: {
    annotations?: any
    destination?: any
    enabled?: any
    env?: any
    extraArgs?: any
    image?: {
      repository?: any
      tag?: any
    }
    resources?: any
    schedule?: any
  }
  fullnameOverride?: any
  nameOverride?: any
  rbac?: {
    install?: any
    roleBindingKind?: any
    roleKind?: any
    roleRef?: any
    serviceAccountName?: any
  }
  tolerations?: any
}

