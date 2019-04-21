// Automatically generated

export interface ChartValues {
  acceptEula?: {
    value?: any
  }
  collation?: any
  edition?: {
    value?: any
  }
  hadr?: any
  image?: {
    pullPolicy?: any
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
    existingLogClaim?: any
    existingMasterClaim?: any
    existingTransactionLogClaim?: any
    masterAccessMode?: any
    masterSize?: any
    storageClass?: any
    transactionLogAccessMode?: any
    transactionLogSize?: any
  }
  readinessprobe?: {
    initialDelaySeconds?: any
    periodSeconds?: any
  }
  replicaCount?: any
  resources?: any
  sapassword?: any
  service?: {
    port?: any
    type?: any
  }
}

