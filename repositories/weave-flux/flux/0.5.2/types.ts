// Automatically generated

export interface ChartValues {
  additionalArgs?: any
  affinity?: any
  extraEnvs?: any
  fullnameOverride?: any
  git?: {
    branch?: any
    ciSkip?: any
    email?: any
    label?: any
    path?: any
    pollInterval?: any
    secretName?: any
    setAuthor?: any
    timeout?: any
    url?: any
    user?: any
  }
  helmOperator?: {
    affinity?: any
    chartsSyncInterval?: any
    create?: any
    createCRD?: any
    extraEnvs?: any
    git?: {
      secretName?: any
      timeout?: any
    }
    logReleaseDiffs?: any
    nodeSelector?: any
    pullPolicy?: any
    repository?: any
    resources?: any
    tag?: any
    tillerNamespace?: any
    tls?: {
      caContent?: any
      certFile?: any
      enable?: any
      hostname?: any
      keyFile?: any
      secretName?: any
      verify?: any
    }
    tolerations?: any
    updateChartDeps?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  kube?: {
    config?: any
  }
  memcached?: {
    affinity?: any
    maxItemSize?: any
    maxMemory?: any
    nodeSelector?: any
    repository?: any
    resources?: any
    tag?: any
    tolerations?: any
    verbose?: any
  }
  nameOverride?: any
  nodeSelector?: any
  prometheus?: {
    enabled?: any
  }
  rbac?: {
    create?: any
  }
  registry?: {
    burst?: any
    cacheExpiry?: any
    insecureHosts?: any
    pollInterval?: any
    rps?: any
    trace?: any
  }
  replicaCount?: any
  resources?: any
  service?: {
    port?: any
    type?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  ssh?: {
    known_hosts?: any
  }
  token?: any
  tolerations?: any
}

