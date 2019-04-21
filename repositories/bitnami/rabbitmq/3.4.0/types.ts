// Automatically generated

export interface ChartValues {
  affinity?: any
  fullnameOverride?: any
  image?: {
    debug?: any
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hostName?: any
    tls?: any
    tlsSecret?: any
  }
  livenessProbe?: {
    enabled?: any
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  metrics?: {
    annotations?: any
    enabled?: any
    image?: {
      pullPolicy?: any
      registry?: any
      repository?: any
      tag?: any
    }
    resources?: any
  }
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    size?: any
    storageClass?: any
  }
  podAnnotations?: any
  rabbitmq?: {
    amqpPort?: any
    clustering?: {
      address_type?: any
      k8s_domain?: any
    }
    configuration?: any
    distPort?: any
    erlangCookie?: any
    managerPort?: any
    nodePort?: any
    password?: any
    plugins?: any
    ulimitNofiles?: any
    username?: any
  }
  rbacEnabled?: any
  readinessProbe?: {
    enabled?: any
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  replicas?: any
  resources?: any
  securityContext?: {
    enabled?: any
    fsGroup?: any
    runAsUser?: any
  }
  serviceType?: any
  tolerations?: any
}

