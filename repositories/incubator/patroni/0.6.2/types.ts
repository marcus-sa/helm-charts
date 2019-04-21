// Automatically generated

export interface ChartValues {
  Component?: any
  Credentials?: {
    Standby?: any
    Superuser?: any
  }
  Etcd?: {
    DeployChart?: any
    Discovery?: any
    Enable?: any
    Host?: any
  }
  Name?: any
  NodeSelector?: any
  Replicas?: any
  Resources?: {
    Cpu?: any
    Memory?: any
  }
  Spilo?: {
    Image?: any
    Version?: any
  }
  WalE?: {
    Backup_Threshold_Megabytes?: any
    Backup_Threshold_Percentage?: any
    Enable?: any
    GCS_Bucket?: any
    Kubernetes_Secret?: any
    Retain_Backups?: any
    S3_Bucket?: any
    Schedule_Cron_Job?: any
  }
  Zookeeper?: {
    DeployChart?: any
    Enable?: any
    Hosts?: any
  }
  persistentVolume?: {
    accessModes?: any
    annotations?: any
    mountPath?: any
    size?: any
    storageClass?: any
    subPath?: any
  }
  rbac?: {
    create?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
}

