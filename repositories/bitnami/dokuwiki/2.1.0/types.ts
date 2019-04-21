// Automatically generated

export interface ChartValues {
  affinity?: any
  dokuwikiEmail?: any
  dokuwikiFullName?: any
  dokuwikiPassword?: any
  dokuwikiUsername?: any
  dokuwikiWikiName?: any
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    enabled?: any
    hosts?: any
    secrets?: any
  }
  livenessProbe?: {
    enabled?: any
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    apache?: {
      accessMode?: any
      size?: any
      storageClass?: any
    }
    dokuwiki?: {
      accessMode?: any
      size?: any
      storageClass?: any
    }
    enabled?: any
  }
  readinessProbe?: {
    enabled?: any
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  resources?: any
  service?: {
    externalTrafficPolicy?: any
    loadBalancerIP?: any
    nodePorts?: {
      http?: any
      https?: any
    }
    type?: any
  }
  tolerations?: any
}

