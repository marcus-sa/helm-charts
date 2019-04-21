// Automatically generated

export interface ChartValues {
  accessLogs?: {
    enabled?: any
    filePath?: any
    format?: any
  }
  acme?: {
    email?: any
    enabled?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      size?: any
      storageClass?: any
    }
    staging?: any
  }
  cpuLimit?: any
  cpuRequest?: any
  dashboard?: {
    auth?: {
      basic?: any
    }
    domain?: any
    enabled?: any
    ingress?: {
      annotations?: any
    }
  }
  debug?: {
    enabled?: any
  }
  gzip?: {
    enabled?: any
  }
  image?: any
  imageTag?: any
  kubernetes?: {
    labelSelector?: any
    namespaces?: any
  }
  loadBalancerIP?: any
  memoryLimit?: any
  memoryRequest?: any
  nodeSelector?: any
  rbac?: {
    enabled?: any
  }
  replicas?: any
  service?: {
    annotations?: any
    labels?: any
  }
  serviceType?: any
  ssl?: {
    defaultCert?: any
    defaultKey?: any
    enabled?: any
    enforced?: any
  }
  tolerations?: any
}

