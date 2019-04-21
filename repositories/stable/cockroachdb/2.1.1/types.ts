// Automatically generated

export interface ChartValues {
  CacheSize?: any
  ClusterDomain?: any
  Component?: any
  ExternalGrpcName?: any
  ExternalGrpcPort?: any
  ExternalHttpPort?: any
  ExtraArgs?: any
  ExtraSecretMounts?: any
  HttpName?: any
  Image?: any
  ImagePullPolicy?: any
  ImageTag?: any
  InternalGrpcName?: any
  InternalGrpcPort?: any
  InternalHttpPort?: any
  JoinExisting?: any
  Locality?: any
  MaxSQLMemory?: any
  MaxUnavailable?: any
  Name?: any
  NetworkPolicy?: {
    AllowExternal?: any
    Enabled?: any
  }
  NodeSelector?: any
  PodManagementPolicy?: any
  Replicas?: any
  Resources?: any
  Secure?: {
    Enabled?: any
    RequestCertsImage?: any
    RequestCertsImageTag?: any
    ServiceAccount?: {
      Create?: any
      Name?: any
    }
  }
  Service?: {
    annotations?: any
    type?: any
  }
  Storage?: any
  StorageClass?: any
  Tolerations?: any
  UpdateStrategy?: any
}

