// Automatically generated

export interface ChartValues {
  addons?: {
    grafana?: {
      deployment?: {
        annotations?: any
        image?: any
        imagePullPolicy?: any
        name?: any
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
        imageTag?: any
        name?: any
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
      replicas?: any
      resources?: any
    }
    service?: {
      externalHttpPort?: any
      externalHttpsPort?: any
      type?: any
    }
  }
  istioRelease?: any
  mixer?: {
    deployment?: {
      image?: any
      imagePullPolicy?: any
      name?: any
      replicas?: any
      resources?: any
    }
    service?: {
      annotations?: any
      externalConfigApiPort?: any
      externalPrometheusPort?: any
      externalTcpPort?: any
      type?: any
    }
  }
  nameOverride?: any
  pilot?: {
    customConfigMap?: any
    deployment?: {
      annotations?: any
      apiserver?: {
        image?: any
        imagePullPolicy?: any
        name?: any
        resources?: any
      }
      discovery?: {
        image?: any
        imagePullPolicy?: any
        name?: any
        resources?: any
      }
      replicas?: any
    }
    name?: any
    service?: {
      externalHttpApiServer?: any
      externalHttpDiscovery?: any
      type?: any
    }
  }
  rbac?: {
    apiVersion?: any
    install?: any
  }
}

