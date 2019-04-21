// Automatically generated

export interface ChartValues {
  deploy?: {
    directory?: any
  }
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    tomcat?: {
      repository?: any
      tag?: any
    }
    webarchive?: {
      repository?: any
      tag?: any
    }
  }
  ingress?: {
    enabled?: any
    hosts?: any
    path?: any
    tls?: any
  }
  livenessProbe?: {
    initialDelaySeconds?: any
    path?: any
    periodSeconds?: any
  }
  nameOverride?: any
  nodeSelector?: any
  readinessProbe?: {
    failureThreshold?: any
    initialDelaySeconds?: any
    path?: any
    periodSeconds?: any
  }
  replicaCount?: any
  resources?: any
  service?: {
    externalPort?: any
    internalPort?: any
    name?: any
    port?: any
    type?: any
  }
  tolerations?: any
}

