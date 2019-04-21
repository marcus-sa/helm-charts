// Automatically generated

export interface ChartValues {
  apprepository?: {
    affinity?: any
    image?: any
    initialRepos?: any
    nodeSelector?: any
    replicaCount?: any
    resources?: any
    syncImage?: any
    tolerations?: any
  }
  chartsvc?: {
    affinity?: any
    image?: any
    livenessProbe?: any
    nodeSelector?: any
    readinessProbe?: any
    replicaCount?: any
    resources?: any
    service?: {
      port?: any
    }
    tolerations?: any
  }
  dashboard?: {
    affinity?: any
    image?: any
    livenessProbe?: any
    nodeSelector?: any
    readinessProbe?: any
    replicaCount?: any
    resources?: any
    service?: {
      port?: any
    }
    tolerations?: any
  }
  frontend?: {
    affinity?: any
    image?: any
    livenessProbe?: any
    nodeSelector?: any
    readinessProbe?: any
    replicaCount?: any
    resources?: any
    service?: {
      annotations?: any
      port?: any
      type?: any
    }
    tolerations?: any
  }
  fullnameOverride?: any
  global?: any
  hooks?: {
    affinity?: any
    image?: any
    nodeSelector?: any
    tolerations?: any
  }
  ingress?: {
    annotations?: any
    certManager?: any
    enabled?: any
    hosts?: any
    path?: any
    secrets?: any
    tls?: any
  }
  mongodb?: {
    existingSecret?: any
    nameOverride?: any
  }
  nameOverride?: any
  rbac?: {
    create?: any
  }
  testImage?: {
    repository?: any
    tag?: any
  }
  tillerProxy?: {
    affinity?: any
    host?: any
    image?: any
    nodeSelector?: any
    replicaCount?: any
    resources?: any
    service?: {
      port?: any
    }
    tls?: {
      ca?: any
      cert?: any
      key?: any
      verify?: any
    }
    tolerations?: any
  }
}

