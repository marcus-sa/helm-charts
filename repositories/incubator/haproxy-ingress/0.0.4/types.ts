// Automatically generated

export interface ChartValues {
  controller?: {
    config?: any
    defaultSslCertificate?: {
      secret?: {
        name?: any
        namespace?: any
      }
    }
    healthzPort?: any
    hostPorts?: {
      enable?: any
      http?: any
      https?: any
      tcp?: any
    }
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    ingressClass?: any
    name?: any
    resources?: any
    service?: {
      annotations?: any
      clusterIP?: any
      enableHttp?: any
      enableHttps?: any
      externalTrafficPolicy?: any
      labels?: any
      loadBalancerIP?: any
      nodePorts?: {
        http?: any
        https?: any
      }
      targetPorts?: {
        http?: any
        https?: any
      }
      type?: any
    }
    statsPort?: any
  }
  defaultBackend?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    name?: any
    resources?: {
      cpu?: any
      memory?: any
    }
    service?: {
      name?: any
    }
  }
  fullnameOverride?: any
  nameOverride?: any
  rbac?: {
    create?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  tcp?: any
}

