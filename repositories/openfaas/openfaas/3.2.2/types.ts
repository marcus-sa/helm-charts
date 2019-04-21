// Automatically generated

export interface ChartValues {
  affinity?: any
  alertmanager?: {
    create?: any
    image?: any
  }
  async?: any
  basic_auth?: any
  exposeServices?: any
  faasIdler?: {
    create?: any
    dryRun?: any
    image?: any
    inactivityDuration?: any
    reconcileInterval?: any
    replicas?: any
  }
  faasnetes?: {
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
    maxIdleConns?: any
    maxIdleConnsPerHost?: any
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
  kubernetesDNSDomain?: any
  nameOverride?: any
  nats?: {
    enableMonitoring?: any
    image?: any
  }
  nodeSelector?: any
  openFaasImagePullPolicy?: any
  openfaasImagePullPolicy?: any
  operator?: {
    create?: any
    createCRD?: any
    image?: any
  }
  prometheus?: {
    create?: any
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

