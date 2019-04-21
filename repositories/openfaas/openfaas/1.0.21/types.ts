// Automatically generated

export interface ChartValues {
  async?: any
  exposeServices?: any
  faasnetesd?: {
    imagePullPolicy?: any
    readTimeout?: any
    writeTimeout?: any
  }
  functionNamespace?: any
  gateway?: {
    readTimeout?: any
    replicas?: any
    upstreamTimeout?: any
    writeTimeout?: any
  }
  images?: {
    alertmanager?: any
    controller?: any
    gateway?: any
    nats?: any
    operator?: any
    prometheus?: any
    queueWorker?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    tls?: any
  }
  nameOverride?: any
  openfaasImagePullPolicy?: any
  operator?: {
    create?: any
  }
  queueWorker?: {
    ackWait?: any
    replicas?: any
  }
  rbac?: any
  serviceType?: any
}

