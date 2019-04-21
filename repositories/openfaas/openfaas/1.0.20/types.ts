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
    upstreamTimeout?: any
    writeTimeout?: any
  }
  images?: {
    alertmanager?: any
    controller?: any
    gateway?: any
    nats?: any
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
  queueWorker?: {
    ackWait?: any
  }
  rbac?: any
  serviceType?: any
}

