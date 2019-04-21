// Automatically generated

export interface ChartValues {
  alertmanager?: {
    image?: any
  }
  async?: any
  basic_auth?: any
  exposeServices?: any
  faasnetesd?: {
    image?: any
    imagePullPolicy?: any
    readTimeout?: any
    writeTimeout?: any
  }
  functionNamespace?: any
  gateway?: {
    image?: any
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
  openfaasImagePullPolicy?: any
  operator?: {
    create?: any
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
}

