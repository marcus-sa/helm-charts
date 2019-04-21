// Automatically generated

export interface ChartValues {
  addons?: {
    grafana?: {
      deployment?: {
        annotations?: any
        image?: any
        imagePullPolicy?: any
        name?: any
        nodeSelector?: any
        replicas?: any
      }
      enabled?: any
      service?: {
        externalPort?: any
        type?: any
      }
    }
    prometheus?: {
      deployment?: {
        annotations?: any
        image?: any
        imagePullPolicy?: any
        imageTag?: any
        name?: any
        nodeSelector?: any
        replicas?: any
        resources?: any
      }
      enabled?: any
      service?: {
        annotations?: any
        externalPort?: any
        type?: any
      }
    }
    servicegraph?: {
      deployment?: {
        annotations?: any
        image?: any
        imagePullPolicy?: any
        name?: any
        nodeSelector?: any
        replicas?: any
        resources?: any
      }
      enabled?: any
      service?: {
        externalPort?: any
        type?: any
      }
    }
    zipkin?: {
      deployment?: {
        annotations?: any
        image?: any
        imagePullPolicy?: any
        imageTag?: any
        name?: any
        nodeSelector?: any
        replicas?: any
      }
      enabled?: any
      service?: {
        externalPort?: any
        type?: any
      }
    }
  }
  auth?: {
    enabled?: any
  }
  ca?: {
    annotations?: any
    deployment?: {
      image?: any
      imagePullPolicy?: any
      name?: any
      nodeSelector?: any
      replicas?: any
      resources?: any
    }
  }
  egress?: {
    annotations?: any
    deployment?: {
      image?: any
      imagePullPolicy?: any
      name?: any
      nodeSelector?: any
      replicas?: any
      resources?: any
    }
    service?: {
      externalHttpPort?: any
      type?: any
    }
  }
  ingress?: {
    annotations?: any
    deployment?: {
      image?: any
      imagePullPolicy?: any
      name?: any
      nodeSelector?: any
      replicas?: any
      resources?: any
    }
    service?: {
      externalHttpPort?: any
      externalHttpsPort?: any
      type?: any
    }
  }
  initializer?: {
    annotations?: any
    customConfigMap?: any
    deployment?: {
      image?: any
      imagePullPolicy?: any
      initImage?: any
      name?: any
      nodeSelector?: any
      proxyImage?: any
      replicas?: any
      resources?: any
    }
    enabled?: any
    policy?: any
  }
  istio?: {
    install?: any
    release?: any
  }
  mixer?: {
    customConfigMap?: any
    deployment?: {
      annotations?: any
      image?: any
      imagePullPolicy?: any
      name?: any
      nodeSelector?: any
      replicas?: any
      resources?: any
    }
    service?: {
      annotations?: any
      externalConfigApiPort?: any
      externalHttpHeathPort?: any
      externalPrometheusPort?: any
      externalStatsdPromPort?: any
      externalStatsdUdpPort?: any
      externalTcpPort?: any
      type?: any
    }
  }
  nameOverride?: any
  nodeSelector?: any
  pilot?: {
    customConfigMap?: any
    deployment?: {
      annotations?: any
      discovery?: {
        image?: any
        imagePullPolicy?: any
        name?: any
        resources?: any
      }
      nodeSelector?: any
      replicas?: any
    }
    name?: any
    service?: {
      externalAdmissionWebhookServer?: any
      externalHttpDiscovery?: any
      type?: any
    }
  }
  rbac?: {
    apiVersion?: any
    install?: any
  }
}

