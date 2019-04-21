// Automatically generated

export interface ChartValues {
  affinity?: any
  awsAccessKeyId?: any
  awsSecretAccessKey?: any
  database?: {
    args?: any
    database?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    livenessProbe?: {
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    password?: any
    readinessProbe?: {
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    rootPassword?: any
    username?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  log?: {
    format?: any
    level?: any
  }
  nameOverride?: any
  nodeSelector?: any
  resources?: any
  service?: {
    internalPort?: any
    port?: any
    type?: any
  }
  tolerations?: any
}

