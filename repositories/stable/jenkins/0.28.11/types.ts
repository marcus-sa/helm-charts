// Automatically generated

export interface ChartValues {
  Agent?: {
    AlwaysPullImage?: any
    Component?: any
    Cpu?: any
    CustomJenkinsLabels?: any
    Enabled?: any
    Image?: any
    ImagePullSecret?: any
    ImageTag?: any
    Memory?: any
    NodeSelector?: any
    PodRetention?: any
    Privileged?: any
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
    HostName?: any
    HostNetworking?: any
    Image?: any
    ImagePullPolicy?: any
    ImagePullSecret?: any
    ImageTag?: any
    Ingress?: {
      Annotations?: any
      ApiVersion?: any
      Path?: any
      TLS?: any
    }
    InitContainerEnv?: any
    InitScripts?: any
    InstallPlugins?: any
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
    PodAnnotations?: any
    RunAsUser?: any
    ScriptApproval?: any
    SecretsFilesSecret?: any
    SecurityRealm?: any
    ServiceAnnotations?: any
    ServiceLabels?: any
    ServicePort?: any
    ServiceType?: any
    SlaveKubernetesNamespace?: any
    SlaveListenerPort?: any
    SlaveListenerServiceAnnotations?: any
    SlaveListenerServiceType?: any
    Tolerations?: any
    UsePodSecurityContext?: any
    UseSecurity?: any
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

