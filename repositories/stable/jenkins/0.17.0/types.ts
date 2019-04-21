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
    AdminPassword?: any
    AdminUser?: any
    Affinity?: any
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
    DisabledAgentProtocols?: any
    FsGroup?: any
    HealthProbeLivenessFailureThreshold?: any
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
    Jobs?: any
    LoadBalancerIP?: any
    LoadBalancerSourceRanges?: any
    Memory?: any
    Name?: any
    NodePort?: any
    NodeSelector?: any
    PodAnnotations?: any
    RunAsUser?: any
    ScriptApproval?: any
    SecretsFilesSecret?: any
    ServiceAnnotations?: any
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
    mounts?: any
    volumes?: any
  }
  fullnameOverride?: any
  nameOverride?: any
  rbac?: {
    apiVersion?: any
    install?: any
    roleBindingKind?: any
    roleRef?: any
    serviceAccountName?: any
  }
}

