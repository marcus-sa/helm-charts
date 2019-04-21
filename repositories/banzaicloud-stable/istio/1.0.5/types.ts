// Automatically generated

export interface ChartValues {
  global?: {
    arch?: any
    controlPlaneSecurityEnabled?: any
    crds?: any
    disablePolicyChecks?: any
    enableTracing?: any
    hub?: any
    imagePullPolicy?: any
    k8sIngressSelector?: any
    omitSidecarInjectorConfigMap?: any
    policyCheckFailOpen?: any
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
      image?: any
      includeIPRanges?: any
      privileged?: any
      readinessFailureThreshold?: any
      readinessInitialDelaySeconds?: any
      readinessPeriodSeconds?: any
      resources?: any
      stats?: {
        prometheusPort?: any
      }
      statusPort?: any
    }
    proxy_init?: {
      image?: any
    }
    tag?: any
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

