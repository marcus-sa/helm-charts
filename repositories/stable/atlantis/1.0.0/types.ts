// Automatically generated

export interface ChartValues {
  affinity?: any
  allowRepoConfig?: any
  atlantisUrl?: any
  atlantis_data_storage?: any
  aws?: {
    config?: any
    credentials?: any
  }
  bitbucket?: {
    base_url?: any
    secret?: any
    token?: any
    user?: any
  }
  fullnameOverride?: any
  gitconfig?: any
  github?: {
    hostname?: any
    secret?: any
    token?: any
    user?: any
  }
  gitlab?: {
    hostname?: any
    secret?: any
    token?: any
    user?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    host?: any
    hosts?: any
    path?: any
    tls?: any
  }
  livenessProbe?: {
    enabled?: any
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    scheme?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  nameOverride?: any
  nodeSelector?: any
  orgWhitelist?: any
  podTemplate?: {
    annotations?: any
  }
  readinessProbe?: {
    enabled?: any
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    scheme?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  replicaCount?: any
  resources?: any
  service?: {
    annotations?: any
    port?: any
    type?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  serviceAccountSecrets?: any
  statefulSet?: {
    annotations?: any
  }
  test?: {
    image?: any
    imageTag?: any
  }
  tolerations?: any
}

