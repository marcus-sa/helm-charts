// Automatically generated

export interface ChartValues {
  additionalArgs?: any
  affinity?: any
  fullnameOverride?: any
  git?: {
    branch?: any
    chartsPath?: any
    email?: any
    path?: any
    pollInterval?: any
    url?: any
    user?: any
  }
  helmOperator?: {
    create?: any
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
  nameOverride?: any
  nodeSelector?: any
  rbac?: {
    create?: any
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

