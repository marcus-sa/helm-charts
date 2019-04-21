// Automatically generated

export interface ChartValues {
  fullnameOverride?: any
  global?: {
    arch?: any
    controlPlaneSecurityEnabled?: any
    crds?: any
    disablePolicyChecks?: any
    enableTracing?: any
    imagePullPolicy?: any
    imagePullSecrets?: any
    k8sIngressSelector?: any
    kubectl?: {
      repository?: any
      tag?: any
    }
    omitSidecarInjectorConfigMap?: any
    priorityClassName?: any
    proxy?: {
      accessLogFile?: any
      autoInject?: any
      concurrency?: any
      enableCoreDump?: any
      envoyStatsd?: {
        enabled?: any
        host?: any
        port?: any
      }
      excludeIPRanges?: any
      excludeInboundPorts?: any
      includeIPRanges?: any
      privileged?: any
      repository?: any
      resources?: any
      tag?: any
    }
    proxy_init?: {
      repository?: any
      tag?: any
    }
  }
  ingress?: {
    enabled?: any
  }
  mixer?: {
    enabled?: any
  }
  nameOverride?: any
  pilot?: {
    enabled?: any
  }
  security?: {
    enabled?: any
  }
}

