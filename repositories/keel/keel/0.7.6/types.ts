// Automatically generated

export interface ChartValues {
  affinity?: any
  aws?: {
    region?: any
  }
  createNamespaceResource?: any
  debug?: any
  ecr?: {
    accessKeyId?: any
    enabled?: any
    region?: any
    secretAccessKey?: any
  }
  fullnameOverride?: any
  gcr?: {
    enabled?: any
    projectId?: any
  }
  googleApplicationCredentials?: any
  helmProvider?: {
    enabled?: any
    tillerAddress?: any
  }
  hipchat?: {
    approvalsChannel?: any
    botName?: any
    channel?: any
    enabled?: any
    password?: any
    token?: any
    userName?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  insecureRegistry?: any
  mattermost?: {
    enabled?: any
    endpoint?: any
  }
  nameOverride?: any
  nodeSelector?: any
  notificationLevel?: any
  podAnnotations?: any
  podDisruptionBudget?: {
    enabled?: any
    maxUnavailable?: any
    minAvailable?: any
  }
  polling?: {
    enabled?: any
  }
  rbac?: {
    enabled?: any
  }
  resources?: any
  service?: {
    clusterIP?: any
    enabled?: any
    externalPort?: any
    type?: any
  }
  serviceAnnotations?: any
  slack?: {
    approvalsChannel?: any
    botName?: any
    channel?: any
    enabled?: any
    token?: any
  }
  tolerations?: any
  webhook?: {
    enabled?: any
    endpoint?: any
  }
  webhookRelay?: {
    bucket?: any
    enabled?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    key?: any
    secret?: any
  }
}

