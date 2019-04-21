// Automatically generated

export interface ChartValues {
  additionalArgs?: any
  affinity?: any
  fullnameOverride?: any
  git?: {
    branch?: any
    ciSkip?: any
    email?: any
    label?: any
    path?: any
    pollInterval?: any
    setAuthor?: any
    url?: any
    user?: any
  }
  helmOperator?: {
    chartsSyncInterval?: any
    chartsSyncTimeout?: any
    create?: any
    createCRD?: any
    git?: {
      branch?: any
      chartsPath?: any
      pollInterval?: any
      secretName?: any
      url?: any
    }
    logReleaseDiffs?: any
    pullPolicy?: any
    repository?: any
    tag?: any
    tillerNamespace?: any
    tls?: {
      caContent?: any
      certFile?: any
      enable?: any
      keyFile?: any
      secretName?: any
      verify?: any
    }
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
    verbose?: any
  }
  nameOverride?: any
  nodeSelector?: any
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

