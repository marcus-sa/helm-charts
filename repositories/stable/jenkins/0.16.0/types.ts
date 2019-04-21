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
    ContainerPort?: any
    Cpu?: any
    CredentialsXmlSecret?: any
    CustomConfigMap?: any
    DisabledAgentProtocols?: any
    FsGroup?: any
    HealthProbeLivenessFailureThreshold?: any
    HealthProbes?: any
    HealthProbesTimeout?: any
    HostName?: any
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
    JenkinsOpts?: any
    JenkinsUriPrefix?: any
    Jobs?: any
    LoadBalancerIP?: any
    LoadBalancerSourceRanges?: any
    Memory?: any
    Name?: any
    NodePort?: any
    NodeSelector?: any
    RunAsUser?: any
    ScriptApproval?: any
    SecretsFilesSecret?: any
    ServiceAnnotations?: any
    ServicePort?: any
    ServiceType?: any
    SlaveListenerPort?: any
    SlaveListenerServiceAnnotations?: any
    SlaveListenerServiceType?: any
    Tolerations?: any
    UseSecurity?: any
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
    roleRef?: any
    serviceAccountName?: any
  }
}

