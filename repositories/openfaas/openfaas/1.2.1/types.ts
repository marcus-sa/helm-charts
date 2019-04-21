// Automatically generated

export interface ChartValues {
  affinity?: any
  alertmanager?: {
    image?: any
  }
  async?: any
  basic_auth?: any
  exposeServices?: any
  faasnetesd?: {
    httpProbe?: any
    image?: any
    imagePullPolicy?: any
    livenessProbe?: {
      initialDelaySeconds?: any
      periodSeconds?: any
      timeoutSeconds?: any
    }
    readTimeout?: any
    readinessProbe?: {
      initialDelaySeconds?: any
      periodSeconds?: any
      timeoutSeconds?: any
    }
    writeTimeout?: any
  }
  functionNamespace?: any
  gateway?: {
    image?: any
    nodePort?: any
    readTimeout?: any
    replicas?: any
    scaleFromZero?: any
    upstreamTimeout?: any
    writeTimeout?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    tls?: any
  }
  nameOverride?: any
  nats?: {
    image?: any
  }
  nodeSelector?: any
  openfaasImagePullPolicy?: any
  operator?: {
    create?: any
    createCRD?: any
    image?: any
  }
  prometheus?: {
    image?: any
  }
  queueWorker?: {
    ackWait?: any
    image?: any
    replicas?: any
  }
  rbac?: any
  securityContext?: any
  serviceType?: any
  tolerations?: any
}

