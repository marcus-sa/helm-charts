// Automatically generated

export interface ChartValues {
  CacheSize?: any
  Component?: any
  GrpcPort?: any
  HttpPort?: any
  Image?: any
  ImagePullPolicy?: any
  ImageTag?: any
  MaxSQLMemory?: any
  MaxUnavailable?: any
  Name?: any
  NetworkPolicy?: {
    AllowExternal?: any
    Enabled?: any
  }
  PodManagementPolicy?: any
  Replicas?: any
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
    type?: any
  }
  Storage?: any
  StorageClass?: any
  UpdateStrategy?: any
  resources?: any
}

