// Automatically generated

export interface ChartValues {
  Master?: {
    Component?: any
    ContainerPort?: any
    Cpu?: any
    DaemonMemory?: any
    Image?: any
    ImageTag?: any
    Memory?: any
    Name?: any
    Replicas?: any
    ServicePort?: any
    ServiceType?: any
  }
  Spark?: {
    Path?: any
  }
  WebUi?: {
    ContainerPort?: any
    Name?: any
    ServicePort?: any
  }
  Worker?: {
    Autoscaling?: {
      Enabled?: any
    }
    Component?: any
    ContainerPort?: any
    Cpu?: any
    CpuTargetPercentage?: any
    DaemonMemory?: any
    ExecutorMemory?: any
    Image?: any
    ImageTag?: any
    Memory?: any
    Name?: any
    Replicas?: any
    ReplicasMax?: any
  }
  Zeppelin?: {
    Component?: any
    ContainerPort?: any
    Cpu?: any
    Image?: any
    ImageTag?: any
    Ingress?: any
    Name?: any
    Persistence?: {
      Config?: {
        Enabled?: any
      }
      Notebook?: {
        Enabled?: any
      }
    }
    Replicas?: any
    ServicePort?: any
    ServiceType?: any
  }
  nameOverride?: any
}

