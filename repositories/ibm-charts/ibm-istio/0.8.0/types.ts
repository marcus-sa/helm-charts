// Automatically generated

export interface ChartValues {
  fullnameOverride?: any
  global?: {
    arch?: any
    controlPlaneSecurityEnabled?: any
    criticalAddonsOnly?: any
    dedicated?: any
    extraNodeSelector?: {
      key?: any
      value?: any
    }
    imagePullPolicy?: any
    kubectl?: {
      repository?: any
      tag?: any
    }
    management?: any
    meshExpansionEnabled?: any
    mtls?: {
      enabled?: any
    }
    priorityClassName?: any
    proxy?: {
      enableCoreDump?: any
      excludeIPRanges?: any
      excludeInboundPorts?: any
      includeIPRanges?: any
      policy?: any
      resources?: any
    }
    proxyInit?: {
      repository?: any
      tag?: any
    }
    proxyv2?: {
      repository?: any
      tag?: any
    }
    refreshInterval?: any
  }
  nameOverride?: any
}

