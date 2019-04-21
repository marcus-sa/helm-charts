// Automatically generated

export interface ChartValues {
  allDatabases?: {
    enabled?: any
    singleBackupFile?: any
  }
  debug?: any
  failedJobsHistoryLimit?: any
  fullnameOverride?: any
  housekeeping?: {
    enabled?: any
    keepDays?: any
  }
  mysql?: {
    db?: any
    host?: any
    password?: any
    port?: any
    username?: any
  }
  nameOverride?: any
  options?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    size?: any
    storageClass?: any
  }
  persistentVolumeClaim?: any
  schedule?: any
  successfulJobsHistoryLimit?: any
  upload?: {
    googlestoragebucket?: {
      bucketname?: any
      enabled?: any
      jsonKeyfile?: any
    }
    ssh?: {
      dir?: any
      enabled?: any
      host?: any
      privatekey?: any
      user?: any
    }
  }
}

