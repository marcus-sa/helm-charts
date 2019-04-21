// Automatically generated

export interface ChartValues {
  Agent?: {
    Cpu?: any
    Image?: any
    ImageTag?: any
    Memory?: any
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
    JavaOpts?: any
    LoadBalancerSourceRanges?: any
    Memory?: any
    Name?: any
    NodePort?: any
    ServicePort?: any
    ServiceType?: any
    SlaveListenerPort?: any
    UseSecurity?: any
  }
  Persistence?: {
    AccessMode?: any
    Enabled?: any
    Size?: any
    StorageClass?: any
    mounts?: any
    volumes?: any
  }
  nameOverride?: any
}

