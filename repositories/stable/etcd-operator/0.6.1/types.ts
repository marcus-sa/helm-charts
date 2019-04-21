// Automatically generated

export interface ChartValues {
  backupOperator?: {
    commandArgs?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    name?: any
    nodeSelector?: any
    replicaCount?: any
    resources?: {
      cpu?: any
      memory?: any
    }
    spec?: any
  }
  customResources?: {
    createBackupCRD?: any
    createEtcdClusterCRD?: any
    createRestoreCRD?: any
  }
  deployments?: {
    backupOperator?: any
    etcdOperator?: any
    restoreOperator?: any
  }
  etcdCluster?: {
    enableTLS?: any
    image?: {
      repository?: any
      tag?: any
    }
    name?: any
    pod?: any
    size?: any
    tls?: any
    version?: any
  }
  etcdOperator?: {
    commandArgs?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    name?: any
    nodeSelector?: any
    resources?: {
      cpu?: any
      memory?: any
    }
  }
  nameOverride?: any
  rbac?: {
    apiVersion?: any
    backupOperatorServiceAccountName?: any
    create?: any
    etcdOperatorServiceAccountName?: any
    restoreOperatorServiceAccountName?: any
  }
  replicaCount?: any
  restoreOperator?: {
    commandArgs?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    name?: any
    nodeSelector?: any
    port?: any
    replicaCount?: any
    resources?: {
      cpu?: any
      memory?: any
    }
    spec?: any
  }
}

