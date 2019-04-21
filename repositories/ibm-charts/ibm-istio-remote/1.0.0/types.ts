// Automatically generated

export interface ChartValues {
  fullnameOverride?: any
  global?: {
    arch?: any
    controlPlaneSecurityEnabled?: any
    dedicated?: any
    disablePolicyChecks?: any
    enableTracing?: any
    extraNodeSelector?: any
    imagePullPolicy?: any
    imagePullSecrets?: any
    kubectl?: {
      repository?: any
      tag?: any
    }
    omitSidecarInjectorConfigMap?: any
    priorityClassName?: any
    proxy?: {
      accessLogFile?: any
      autoInject?: any
      enableCoreDump?: any
      envoyStatsd?: {
        enabled?: any
        host?: any
        port?: any
      }
      excludeIPRanges?: any
      excludeInboundPorts?: any
      includeIPRanges?: any
      repository?: any
      resources?: any
      tag?: any
    }
    proxyInit?: {
      repository?: any
      tag?: any
    }
    proxyNode?: any
    remotePilotAddress?: any
    remotePilotCreateSvcEndpoint?: any
    remotePolicyAddress?: any
    remoteTelemetryAddress?: any
    remoteZipkinAddress?: any
  }
  nameOverride?: any
}

