// Automatically generated

export interface ChartValues {
  Agent?: {
    Component?: any
    Cpu?: any
    Enabled?: any
    Image?: any
    ImageTag?: any
    Memory?: any
    Privileged?: any
  }
  Master?: {
    AdminPassword?: any
    AdminUser?: any
    Component?: any
    ContainerPort?: any
    Cpu?: any
    CustomConfigMap?: any
    HostName?: any
    Image?: any
    ImagePullPolicy?: any
    ImageTag?: any
    Ingress?: {
      Annotations?: any
      TLS?: any
    }
    InitScripts?: any
    InstallPlugins?: any
    JMXPort?: any
    JavaOpts?: any
    LoadBalancerSourceRanges?: any
    Memory?: any
    Name?: any
    NodePort?: any
    ScriptApproval?: any
    ServicePort?: any
    ServiceType?: any
    SlaveListenerPort?: any
    UseSecurity?: any
  }
  NetworkPolicy?: {
    ApiVersion?: any
    Enabled?: any
  }
  Persistence?: {
    AccessMode?: any
    Enabled?: any
    ExistingClaim?: any
    Size?: any
    StorageClass?: any
    mounts?: any
    volumes?: any
  }
  nameOverride?: any
}

