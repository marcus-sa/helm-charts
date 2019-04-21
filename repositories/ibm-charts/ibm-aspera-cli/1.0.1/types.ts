// Automatically generated

export interface ChartValues {
  arch?: any
  cli?: {
    additionalOptions?: any
    aoc?: {
      org?: any
      package?: {
        id?: any
        name?: any
        recipients?: any
      }
      secret?: any
      workspace?: any
    }
    debugLevel?: any
    direction?: any
    localPath?: any
    passwordSecretName?: any
    remoteHost?: any
    remotePath?: any
    remotePort?: any
    subcommand?: any
    username?: any
  }
  cronjob?: {
    concurrencyPolicy?: any
    enabled?: any
    failedJobsHistoryLimit?: any
    schedule?: any
    successfulJobsHistoryLimit?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    secretName?: any
    tag?: any
  }
  job?: {
    backoffLimit?: any
    restartPolicy?: any
  }
  resources?: {
    limits?: {
      cpu?: any
      memory?: any
    }
    requests?: {
      cpu?: any
      memory?: any
    }
  }
  volume?: {
    existingClaimName?: any
    mountPath?: any
    name?: any
  }
}

