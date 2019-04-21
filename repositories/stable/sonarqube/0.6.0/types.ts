// Automatically generated

export interface ChartValues {
  affinity?: any
  extraEnv?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    tls?: any
  }
  livenessProbe?: {
    initialDelaySeconds?: any
    periodSeconds?: any
  }
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
  }
  plugins?: {
    install?: any
    resources?: any
  }
  postgresql?: {
    enabled?: any
    postgresDatabase?: any
    postgresPassword?: any
    postgresServer?: any
    postgresUser?: any
    service?: {
      port?: any
    }
  }
  readinessProbe?: {
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
  }
  replicaCount?: any
  resources?: any
  service?: {
    LoadBalancerIP?: any
    annotations?: any
    externalPort?: any
    internalPort?: any
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
    name?: any
    type?: any
  }
  sonarProperties?: any
  tolerations?: any
}

