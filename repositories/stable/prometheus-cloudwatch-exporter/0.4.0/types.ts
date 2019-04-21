// Automatically generated

export interface ChartValues {
  affinity?: any
  aws?: {
    aws_access_key_id?: any
    aws_secret_access_key?: any
    role?: any
    secret?: {
      includesSessionToken?: any
      name?: any
    }
  }
  config?: any
  fullnameOverride?: any
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
  nameOverride?: any
  nodeSelector?: any
  rbac?: {
    create?: any
  }
  readinessProbe?: {
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  replicaCount?: any
  resources?: any
  service?: {
    annotations?: any
    labels?: any
    port?: any
    portName?: any
    targetPort?: any
    type?: any
  }
  serviceAccount?: {
    create?: any
  }
  tolerations?: any
}

