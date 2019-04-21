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
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    labels?: any
    path?: any
    tls?: any
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
    type?: any
  }
  serviceAccount?: {
    create?: any
  }
  serviceMonitor?: {
    enabled?: any
    interval?: any
    labels?: any
    namespace?: any
    telemetryPath?: any
  }
  tolerations?: any
}

