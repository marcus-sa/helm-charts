// Automatically generated

export interface ChartValues {
  affinity?: any
  credentials?: {
    admin?: any
    standby?: any
    superuser?: any
  }
  etcd?: {
    deployChart?: any
    discovery?: any
    enable?: any
    host?: any
  }
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  nameOverride?: any
  nodeSelector?: any
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
  replicaCount?: any
  resources?: any
  serviceAccount?: {
    create?: any
    name?: any
  }
  tolerations?: any
  walE?: {
    backupThresholdMegabytes?: any
    backupThresholdPercentage?: any
    enable?: any
    gcsBucket?: any
    kubernetesSecret?: any
    retainBackups?: any
    s3Bucket?: any
    scheduleCronJob?: any
  }
  zookeeper?: {
    deployChart?: any
    enable?: any
    hosts?: any
  }
}

