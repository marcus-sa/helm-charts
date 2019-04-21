// Automatically generated

export interface ChartValues {
  apprepository?: {
    affinity?: any
    image?: any
    initialRepos?: any
    jobsImage?: any
    nodeSelector?: any
    resources?: any
    syncImage?: any
    tolerations?: any
  }
  chartsvc?: {
    affinity?: any
    image?: any
    nodeSelector?: any
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
    resources?: any
    service?: {
      port?: any
      type?: any
    }
    tolerations?: any
  }
  fullnameOverride?: any
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    path?: any
    tls?: any
  }
  mongodb?: {
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

