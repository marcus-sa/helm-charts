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
    logging?: any
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
      labels?: any
    }
    service?: {
      annotations?: any
    }
    statistics?: {
      recentErrors?: any
    }
  }
  debug?: {
    enabled?: any
  }
  deployment?: {
    hostPort?: {
      dashboardEnabled?: any
      httpEnabled?: any
      httpsEnabled?: any
    }
    podAnnotations?: any
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
  loadBalancerSourceRanges?: any
  memoryLimit?: any
  memoryRequest?: any
  metrics?: {
    datadog?: {
      address?: any
      enabled?: any
      pushinterval?: any
    }
    prometheus?: {
      buckets?: any
      enabled?: any
    }
    statsd?: {
      address?: any
      enabled?: any
      pushinterval?: any
    }
  }
  nodeSelector?: any
  rbac?: {
    enabled?: any
  }
  replicas?: any
  service?: {
    annotations?: any
    labels?: any
    nodePorts?: {
      http?: any
      https?: any
    }
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

