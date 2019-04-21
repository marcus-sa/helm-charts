// Automatically generated

export interface ChartValues {
  affinity?: any
  annotations?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  nameOverride?: any
  nodeSelector?: any
  replicaCount?: any
  resources?: any
  restartPolicy?: any
  service?: {
    annotations?: any
    httpPort?: any
    type?: any
  }
  stackdriver?: {
    backoffJitter?: any
    httpTimeout?: any
    maxBackoff?: any
    maxRetries?: any
    metrics?: {
      interval?: any
      offset?: any
      typePrefixes?: any
    }
    projectId?: any
    retryStatuses?: any
  }
  tolerations?: any
  web?: {
    listenAddress?: any
    path?: any
  }
}

