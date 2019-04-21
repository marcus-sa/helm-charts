// Automatically generated

export interface ChartValues {
  acceptEula?: {
    value?: any
  }
  collation?: any
  deployment?: {
    annotations?: any
    labels?: any
  }
  edition?: {
    value?: any
  }
  fullnameOverride?: any
  hadr?: any
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    repository?: any
    tag?: any
  }
  lcid?: any
  livenessprobe?: {
    initialDelaySeconds?: any
    periodSeconds?: any
  }
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    annotations?: any
    backupAccessMode?: any
    backupSize?: any
    dataAccessMode?: any
    dataSize?: any
    enabled?: any
    existingBackupClaim?: any
    existingDataClaim?: any
    existingMasterClaim?: any
    existingTransactionLogClaim?: any
    masterAccessMode?: any
    masterSize?: any
    storageClass?: any
    transactionLogAccessMode?: any
    transactionLogSize?: any
  }
  pod?: {
    annotations?: any
    labels?: any
  }
  readinessprobe?: {
    initialDelaySeconds?: any
    periodSeconds?: any
  }
  replicaCount?: any
  resources?: {
    limits?: {
      memory?: any
    }
  }
  sapassword?: any
  service?: {
    annotations?: any
    headless?: any
    labels?: any
    port?: any
    type?: any
  }
}

