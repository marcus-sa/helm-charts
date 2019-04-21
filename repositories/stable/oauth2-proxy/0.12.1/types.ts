// Automatically generated

export interface ChartValues {
  affinity?: any
  authenticatedEmailsFile?: {
    enabled?: any
    restricted_access?: any
    template?: any
  }
  config?: {
    clientID?: any
    clientSecret?: any
    configFile?: any
    cookieSecret?: any
    existingConfig?: any
    existingSecret?: any
    google?: {
      existingSecret?: any
    }
  }
  extraArgs?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  imagePullSecrets?: any
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    path?: any
    tls?: any
  }
  livenessProbe?: {
    enabled?: any
    initialDelaySeconds?: any
    timeoutSeconds?: any
  }
  nameOverride?: any
  nodeSelector?: any
  podAnnotations?: any
  podLabels?: any
  priorityClassName?: any
  readinessProbe?: {
    enabled?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  replicaCount?: any
  resources?: any
  service?: {
    annotations?: any
    clusterIP?: any
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
    port?: any
    type?: any
  }
  tolerations?: any
}

