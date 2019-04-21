// Automatically generated

export interface ChartValues {
  flow?: {
    image?: any
    logLevel?: any
    resources?: any
    service?: {
      annotations?: any
      port?: any
      type?: any
    }
    tag?: any
  }
  fn?: {
    service?: {
      annotations?: any
      port?: any
      type?: any
    }
  }
  fnlb?: {
    image?: any
    logLevel?: any
    resources?: any
    tag?: any
  }
  fnserver?: {
    image?: any
    logLevel?: any
    nodeSelector?: any
    resources?: any
    tag?: any
    tolerations?: any
  }
  imagePullPolicy?: any
  mysql?: {
    persistence?: {
      enabled?: any
    }
  }
  nameOverride?: any
  rbac?: {
    enabled?: any
  }
  ui?: {
    enabled?: any
    flowui?: {
      image?: any
      resources?: any
      tag?: any
    }
    fnui?: {
      image?: any
      resources?: any
      tag?: any
    }
    service?: {
      annotations?: any
      flowuiPort?: any
      fnuiPort?: any
      type?: any
    }
  }
}

